tolk 1.2

// Pay2Join: a minimal paywall / pay-to-join contract.
//
// - Users call BuyAccess and pay >= price.
// - Contract stores accessUntil[buyer] = max(prevUntil, now) + durationSec
// - Owner can withdraw.

const ERR_UNKNOWN_OP = 100
const ERR_NOT_OWNER = 101
const ERR_NOT_ENOUGH_VALUE = 102
const ERR_WITHDRAW_TOO_MUCH = 103

// You can change defaults by changing contract initial data (see TS wrapper config).
struct Storage {
    owner: address
    price: coins
    accessDurationSec: uint32
    accessUntil: map<address, uint32>
}

@pure
fun Storage.load(): Storage {
    return Storage.fromCell(contract.getData());
}

fun Storage.save(self): void {
    contract.setData(self.toCell());
}

// ===== Messages (internal) =====

// NOTE: opcode values are arbitrary, they only must be unique within this contract.
struct (0x4f0b7a11) BuyAccess {
    queryId: uint64
}

struct (0x0f6d8bb3) Withdraw {
    queryId: uint64
    amount: coins
}

struct (0x6c3e0f71) SetPrice {
    queryId: uint64
    price: coins
}

struct (0x5c5a2f42) SetAccessDuration {
    queryId: uint64
    durationSec: uint32
}

type AllowedMessage = BuyAccess | Withdraw | SetPrice | SetAccessDuration

fun requireOwner(sender: address, owner: address): void {
    if (sender != owner) {
        throw ERR_NOT_OWNER;
    }
}

@pure
fun readAccessUntil(st: Storage, user: address): int {
    val r = st.accessUntil.get(user);
    if (r.isFound) {
        return r.loadValue() as int;
    }
    return 0;
}

fun onInternalMessage(in: InMessage) {
    // Blueprint deploy sends an empty body internal message.
    // We treat empty body as "no-op" to allow deployment.
    if (in.body.isEmpty()) {
        return;
    }

    val msg = lazy AllowedMessage.fromSlice(in.body);
    match (msg) {
        BuyAccess => {
            var st = Storage.load();

            if (in.valueCoins < st.price) {
                throw ERR_NOT_ENOUGH_VALUE;
            }

            val now: int = blockchain.now();
            val prevUntil: int = readAccessUntil(st, in.senderAddress);
            val base: int = max(now, prevUntil);

            val newUntil: uint32 = (base + (st.accessDurationSec as int)) as uint32;
            st.accessUntil.set(in.senderAddress, newUntil);
            st.save();
        }

        Withdraw => {
            val st = Storage.load();
            requireOwner(in.senderAddress, st.owner);

            // Keep a small amount to avoid accidental "empty balance" edge cases.
            val minKeep: coins = ton("0.01");
            val balanceInt: int = contract.getOriginalBalance() as int;
            val maxWithdrawInt: int = balanceInt - (minKeep as int);

            if ((msg.amount as int) > maxWithdrawInt) {
                throw ERR_WITHDRAW_TOO_MUCH;
            }

            val payout = createMessage({
                bounce: BounceMode.NoBounce,
                value: msg.amount,
                dest: st.owner,
            });
            payout.send(SEND_MODE_PAY_FEES_SEPARATELY);
        }

        SetPrice => {
            var st = Storage.load();
            requireOwner(in.senderAddress, st.owner);
            st.price = msg.price;
            st.save();
        }

        SetAccessDuration => {
            var st = Storage.load();
            requireOwner(in.senderAddress, st.owner);
            st.accessDurationSec = msg.durationSec;
            st.save();
        }

        else => {
            throw ERR_UNKNOWN_OP;
        }
    }
}

// ===== Get methods =====

get fun getOwner(): address {
    return Storage.load().owner;
}

get fun getPrice(): coins {
    return Storage.load().price;
}

get fun getAccessDurationSec(): uint32 {
    return Storage.load().accessDurationSec;
}

get fun getAccessUntil(user: address): uint32 {
    val st = Storage.load();
    val r = st.accessUntil.get(user);
    if (r.isFound) {
        return r.loadValue();
    }
    return 0;
}

get fun hasAccess(user: address): bool {
    val until: int = getAccessUntil(user) as int;
    return until > blockchain.now();
}
