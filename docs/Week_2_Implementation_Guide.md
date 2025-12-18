# Week 2: Implementation Tasks Guide

## 📋 Overview

Week 2 focuses on **hands-on implementation** to test TON's developer tools, SDKs, and documentation through real-world tasks. Your goal is to identify friction points, bugs, and areas for improvement while completing practical tasks.

---

## 🎯 Your Mission

As you complete each task, document:
- **What worked well** ✅
- **What was confusing or broken** ❌
- **What documentation was missing or unclear** 📚
- **How it compares to other chains/ecosystems** 🔄

---

## 📝 Feedback Format (Required for Each Task)

For every task you complete, provide:

1. **Screenshot** of the issue/suggestion you're discussing
2. **Links** to the documentation sections you referenced
3. **Your feedback** in text format (video/loom optional but helpful)

### Feedback Metrics to Evaluate:

- **UX** - How intuitive was the process? Were tools easy to use?
- **Clarity** - Was the documentation clear and easy to follow?
- **Factual Accuracy** - Did the docs match reality? Any outdated info?

---

## 👥 Tasks by Persona

### 🔰 **Novice** (New to Web3)

#### Task 1: Set up a TON wallet and send your first on-chain transfer

**Steps to follow:**
1. Choose a wallet (Tonkeeper, TON Wallet, etc.)
2. Create/import a wallet
3. Get testnet tokens (if needed)
4. Send a transaction to another address

**Documentation to review:**
- Wallet setup guides
- Transaction sending tutorials
- Testnet faucet instructions

**What to document:**
- How easy was wallet setup?
- Was the transaction process clear?
- Any confusing terminology?
- Screenshots of the process
- Links to docs you used

---

#### Task 2: Explore TON explorers and read a simple transaction trace

**Steps to follow:**
1. Visit TONScan, TONViewer, or other explorers
2. Find a recent transaction
3. Understand the transaction details
4. Trace message flow

**Documentation to review:**
- Explorer documentation
- Transaction structure guides
- Message flow explanations

**What to document:**
- Is the explorer UI intuitive?
- Are transaction details easy to understand?
- What information is missing or unclear?
- Screenshots of confusing/helpful parts

---

#### Task 3: Deploy a basic Jetton using a no-code or low-code tool

**Steps to follow:**
1. Find a no-code Jetton deployment tool
2. Follow the deployment process
3. Verify the Jetton on-chain
4. Test basic Jetton operations

**Documentation to review:**
- Jetton deployment guides
- No-code tool documentation
- Jetton standard documentation

**What to document:**
- How smooth was the deployment process?
- Were there any unclear steps?
- What would make this easier for beginners?
- Screenshots of the tool/process

---

#### Task 4: Interact with a Telegram Mini App that uses TON Connect

**Steps to follow:**
1. Find a TON Mini App (TMA)
2. Connect your wallet via TON Connect
3. Perform an action (send, receive, etc.)
4. Understand the connection flow

**Documentation to review:**
- TON Connect documentation
- Telegram Mini Apps guides
- Integration examples

**What to document:**
- How seamless was the connection?
- Was the UX intuitive?
- Any friction points?
- Screenshots of the experience

---

#### Task 5: Run a simple get method on a contract using a public API

**Steps to follow:**
1. Find a contract address
2. Identify a get method to call
3. Use TON API (toncenter, tonapi, etc.)
4. Execute the get method
5. Understand the response

**Documentation to review:**
- TON API documentation
- Get methods guide
- Contract interaction tutorials

**What to document:**
- How easy was it to find the right API?
- Was the documentation clear?
- Any API issues or limitations?
- Code examples and screenshots

---

### 🧳 **Nomad** (New to TON - Web3 Native)

#### Task 1: Write and deploy your first smart contract with Tact or FunC

**Steps to follow:**
1. Choose Tact or FunC
2. Set up development environment
3. Write a simple contract (e.g., counter, storage)
4. Compile the contract
5. Deploy to testnet
6. Interact with the contract

**Documentation to review:**
- Tact/FunC getting started guides
- Contract deployment tutorials
- Development environment setup
- Compilation and testing docs

**What to document:**
- How does setup compare to Solidity/Rust?
- Were the docs clear for someone new to TON?
- Any missing examples or explanations?
- Code snippets and deployment screenshots
- Comparison with other chains' developer experience

---

#### Task 2: Build a simple TMA that connects a TON wallet via TON Connect

**Steps to follow:**
1. Set up a Telegram Mini App project
2. Integrate TON Connect SDK
3. Implement wallet connection
4. Add a simple action (e.g., display balance)
5. Test the integration

**Documentation to review:**
- TON Connect SDK documentation
- TMA development guides
- Integration examples
- Telegram Bot API docs

**What to document:**
- How smooth was the SDK integration?
- Were there enough examples?
- Any missing features compared to WalletConnect?
- Code examples and screenshots
- Comparison with other wallet connection methods

---

#### Task 3: Mint a Jetton with custom metadata and verify it on chain

**Steps to follow:**
1. Understand Jetton standard
2. Deploy a Jetton contract
3. Mint tokens with custom metadata
4. Verify metadata on-chain
5. Check in explorer

**Documentation to review:**
- Jetton standard (TEP-74)
- Jetton deployment guides
- Metadata standards
- Verification processes

**What to document:**
- How clear is the Jetton standard?
- Was metadata handling straightforward?
- Any confusion compared to ERC-20?
- Code examples and on-chain verification screenshots

---

#### Task 4: Test and debug your contract using local TVM tools

**Steps to follow:**
1. Set up local TVM emulator
2. Write test cases for your contract
3. Run tests locally
4. Debug failed tests
5. Understand TVM execution

**Documentation to review:**
- TVM documentation
- Testing frameworks (Tact tests, FunC tests)
- Debugging guides
- Local emulator setup

**What to document:**
- How does testing compare to other chains?
- Were debugging tools helpful?
- Any missing testing features?
- Test code examples and debugging screenshots

---

#### Task 5: Implement gas estimation and understand execution phases from traces

**Steps to follow:**
1. Understand TON gas model
2. Estimate gas for transactions
3. Analyze transaction traces
4. Understand execution phases
5. Optimize gas usage

**Documentation to review:**
- Gas estimation guides
- Transaction trace documentation
- Execution phase explanations
- Gas optimization tips

**What to document:**
- How clear is the gas model?
- Were estimation tools accurate?
- How does it compare to Ethereum/Solana?
- Screenshots of traces and gas estimates

---

### 🚀 **TON Pro** (TON Native Developer)

#### Task 1: Implement a multi-contract architecture with sharding-aware message flows

**Steps to follow:**
1. Design multi-contract system
2. Implement sharding-aware messaging
3. Handle account chains
4. Test cross-shard communication
5. Optimize message routing

**Documentation to review:**
- Sharding documentation
- Multi-contract patterns
- Message routing guides
- Account chain explanations

**What to document:**
- How clear is sharding documentation?
- Were there enough advanced examples?
- Any missing patterns or best practices?
- Architecture diagrams and code examples

---

#### Task 2: Use advanced TVM features like continuations and builder logic

**Steps to follow:**
1. Understand TVM continuations
2. Implement builder patterns
3. Use advanced opcodes
4. Optimize contract logic
5. Test edge cases

**Documentation to review:**
- TVM opcodes reference
- Continuation documentation
- Builder pattern guides
- Advanced TVM features

**What to document:**
- How comprehensive is TVM documentation?
- Were advanced features well-explained?
- Any missing examples or edge cases?
- Code examples and performance analysis

---

#### Task 3: Write custom on-chain libraries for reusable logic

**Steps to follow:**
1. Design library interface
2. Implement reusable functions
3. Deploy library contract
4. Import and use in other contracts
5. Test library functionality

**Documentation to review:**
- Library development guides
- Code reuse patterns
- Import/export mechanisms
- Best practices

**What to document:**
- How easy is library development?
- Were patterns clear?
- Any limitations compared to other ecosystems?
- Library code and usage examples

---

#### Task 4: Build a production-grade staking or vesting contract with an upgrade path

**Steps to follow:**
1. Design staking/vesting logic
2. Implement upgrade mechanism
3. Add security features
4. Write comprehensive tests
5. Deploy and verify

**Documentation to review:**
- Upgrade patterns
- Security best practices
- Staking/vesting examples
- Production deployment guides

**What to document:**
- How clear are upgrade patterns?
- Were security practices well-documented?
- Any missing production considerations?
- Contract code and deployment process

---

#### Task 5: Integrate Merkle proofs and system contracts for trustless verification

**Steps to follow:**
1. Understand Merkle proof implementation
2. Integrate system contracts
3. Implement verification logic
4. Test trustless operations
5. Optimize gas usage

**Documentation to review:**
- System contracts documentation
- Merkle proof guides
- Trustless verification patterns
- Security considerations

**What to document:**
- How well-documented are system contracts?
- Were Merkle proof examples clear?
- Any security concerns or missing info?
- Implementation code and test results

---

## 📊 Week 2 Reporting Template

For each task, create a report with:

### Task Report Structure:

```markdown
## Task: [Task Name]

### Persona: [Novice/Nomad/TON Pro]

### Date Completed: [Date]

### Documentation Used:
- [Link 1 - Description]
- [Link 2 - Description]
- [Link 3 - Description]

### Process:
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Screenshots:
- [Screenshot 1: Issue/Process]
- [Screenshot 2: Documentation]
- [Screenshot 3: Result]

### Feedback:

#### UX Score: [1-5]
**Comments:**
- What was intuitive?
- What was confusing?
- How could it be improved?

#### Clarity Score: [1-5]
**Comments:**
- Was documentation easy to follow?
- Were examples helpful?
- What was unclear?

#### Factual Accuracy Score: [1-5]
**Comments:**
- Did docs match reality?
- Any outdated information?
- Any incorrect examples?

### Comparison with Other Ecosystems:
- [How does this compare to Ethereum/Solana/Polygon?]
- [What does TON do better?]
- [What could TON learn from others?]

### Bugs/Issues Found:
- [Bug 1: Description + Steps to reproduce]
- [Bug 2: Description + Steps to reproduce]

### Suggestions for Improvement:
- [Suggestion 1]
- [Suggestion 2]
- [Suggestion 3]

### Code/Examples:
[If applicable, include code snippets]
```

---

## 🎯 Week 2 Goals

By the end of Week 2, you should have:

1. ✅ Completed all tasks for your persona
2. ✅ Documented feedback for each task (UX, Clarity, Factual Accuracy)
3. ✅ Identified bugs, missing features, and UX issues
4. ✅ Compared TON's developer experience with other ecosystems
5. ✅ Provided actionable suggestions for improvement
6. ✅ Created screenshots and examples for your reports

---

## 💡 Tips for Success

1. **Take notes as you go** - Don't wait until the end to document
2. **Screenshot everything** - Issues, successes, confusing parts
3. **Compare actively** - Think about how other chains handle similar tasks
4. **Be specific** - "The gas estimation was unclear" → "The gas estimation docs didn't explain how to handle failed transactions"
5. **Test edge cases** - Try to break things, find limitations
6. **Ask questions** - If something is unclear, document it as a gap

---

## 🔗 Useful Resources

- **TON Documentation**: https://docs.ton.org/
- **TON API**: https://toncenter.com/api/v2/
- **TON Explorer**: https://tonscan.org/
- **TON Testnet Faucet**: [Search docs for current faucet]
- **TON Connect**: https://docs.ton.org/develop/dapps/ton-connect/overview
- **Tact Language**: https://tact-lang.org/
- **FunC Documentation**: https://docs.ton.org/develop/func/overview

---

## 📞 Need Help?

- Telegram: @fredrikparker
- Check your individual Notion page for persona-specific guidance
- Review sample pages for formatting examples

---

## ✅ Week 2 Checklist

- [ ] Identified my persona (Novice/Nomad/TON Pro)
- [ ] Reviewed all tasks for my persona
- [ ] Set up development environment
- [ ] Completed Task 1 and documented feedback
- [ ] Completed Task 2 and documented feedback
- [ ] Completed Task 3 and documented feedback
- [ ] Completed Task 4 and documented feedback
- [ ] Completed Task 5 and documented feedback
- [ ] Submitted all reports to my Notion page
- [ ] Prepared for Week 3 capstone project

---

**Remember**: The goal is not just to complete tasks, but to identify how TON can improve its developer experience. Your honest, detailed feedback is what makes this program valuable! 🚀




