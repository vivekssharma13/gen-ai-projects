# Smart Email Generator — Prompt Engineering Notes

## 📋 Project Overview

This project focuses on building a **Smart Email Generator** using local LLM models with JavaScript, emphasizing **prompt engineering** and **prompt templates**. The goal is to create an AI-powered email generator that produces relevant, focused email content while handling complex prompts effectively.

---

## 🎯 Key Learning Objectives

- Understand **prompt engineering basics** and best practices
- Build prompt templates and rules to guide the AI output
- Manage prompt complexity and keep the model focused
- Handle token limits and context window (`nCtx`) sizing
- Run and optimize models locally without API costs
- Troubleshoot common issues with local model setups

---

## 📝 Important Notes & Lessons Learned

### 1. **Model Selection**

**Recommended Local Models:**
- **`orca-mini-3b-gguf2-q4_0.gguf`** - Stable, lightweight local model
- **`gpt4all-j-v1.3-groovy`** - Reliable GPT4All model with out-of-the-box download support
- **`nous-hermes-2-mistral-7b`** - More advanced model (requires manual download from Hugging Face due to 404 errors)

**Key Points:**
- Use **local models** that do not require API credits
- Always avoid spaces in folder or file names to prevent build or runtime errors
- More advanced models may require manual download from Hugging Face

### 2. **Prompt Engineering Challenges**

**Common Issues:**
- Lower-capacity models can get distracted and output irrelevant answers (jokes, math, etc.)
- Models may lose focus with complex or lengthy prompts

**Solutions:**
- Simplify prompt instructions to keep the model focused
- Use explicit instructions for the model to check user intent before generating emails
- Templates and rules are key to guiding consistent and relevant output
- Test prompts iteratively: start simple, then add complexity

### 3. **Token and Context Management**

**Context Window (`nCtx`) Guidelines:**
- `nCtx` controls how many tokens the model can see in context
- **For 16GB RAM + Apple M1**: Recommended `nCtx` is **2048** tokens (balanced performance/memory)
- **Memory Issues**: Reduce `nCtx` to **1024**
- **Need More Context**: Increase cautiously to **3072**

**Important Considerations:**
- Larger `nCtx` requires more RAM and CPU power
- May slow inference with higher values
- Balance between context needs and system performance

### 4. **Model Loading and Setup**

**Basic Model Loading:**
```javascript
const model = await loadModel("orca-mini-3b-gguf2-q4_0.gguf", {
  verbose: false,
  device: "cpu",
  nCtx: 2048,
});
```

**Configuration Options:**
- **CPU Usage**: `device: "cpu"` (default)
- **GPU Usage**: `device: "cuda"` (check hardware compatibility first)
- **Local Path**: Use for manually downloaded models
- **Verbose Logging**: `verbose: true` for debugging

**File Path Requirements:**
- Avoid folder names or file paths with spaces
- Use paths like `~/Projects/SmartEmailGenerator`
- NOT `~/My Projects/Smart Email Generator`

### 5. **Common Issues & Fixes**

#### Missing node-addon-api
**Solution:**
1. Install build tools
2. Clean `node_modules`
3. Reinstall dependencies

#### Model Download 404 Errors
**Solution:**
- Use manual download from Hugging Face for unsupported models
- Load via local path instead of automatic download

#### Path Spaces Cause Build Errors
**Solution:**
- Always use paths without spaces
- Example: `~/Projects/SmartEmailGenerator`

---

## 🔧 Additional Best Practices

### Prompt Engineering Techniques
- **Iterative Testing**: Start simple, then add complexity
- **Few-shot Examples**: Include examples in prompts to show desired output format
- **Chain-of-thought**: Ask model to explain reasoning before output
- **Clear Instructions**: Be explicit about what you want the model to do

### Model Limitations Awareness
- Local models have smaller vocabulary and understanding compared to API-based LLMs
- Keep expectations realistic for local model capabilities
- Design prompts that work within these constraints

### Development Workflow
- Version control your prompt templates and rules as part of your project
- Document prompt iterations and their effectiveness
- Test across different scenarios and edge cases

---

## 📚 References

- [GPT4All Models](https://gpt4all.io/)
- [Hugging Face Model Hub](https://huggingface.co/models)
- Apple M1 and local ML performance considerations
- [OpenAI Prompt Engineering Guidelines](https://platform.openai.com/docs/guides/prompt-engineering)

---

## 🎯 Project Structure

```
SmartEmailGenerator/
├── models/                 # Local model files
├── src/
│   ├── prompts/           # Prompt templates
│   ├── utils/             # Helper functions
│   └── email-generator.js # Main application
├── tests/                 # Test files
└── docs/                 # Documentation
```

---

## 💡 Key Takeaways

**Technical Insights:**
- Managing prompt complexity is crucial for local model success
- Context window sizing significantly impacts performance and memory usage
- Local model quirks require specific handling and setup considerations

**Development Lessons:**
- System constraints (paths, dependencies, hardware) are key to smooth development
- Prompt engineering is an iterative process requiring continuous refinement
- Local models offer cost-effective alternatives but come with trade-offs in capability

**Best Practices:**
- Always test prompts with your target model before deployment
- Keep detailed notes on what works and what doesn't
- Design for the limitations of your chosen model

---

**Summary:** This project was a practical dive into prompt engineering with local AI models. The combination of technical setup, prompt optimization, and system management creates a comprehensive learning experience in building AI-powered applications without relying on external APIs.