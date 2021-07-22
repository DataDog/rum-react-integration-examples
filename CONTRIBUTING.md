# Contributing to Rum React Integration

First of all, thanks for taking the time to contribute!

This document provides some basic guidelines for contributing to this repository. To propose improvements, feel free to submit a pull request.

## Table of Contents
  - [Submitting issues](#submitting-issues)
  - [Pull Requests](#pull-requests)
    - [Suggesting Enhancements](#suggesting-enhancements)
      - [Before Submitting an Enhancement](#before-submitting-an-enhancement)
      - [How Do I Submit a Good Enhancement Suggestion?](#how-do-i-submit-a-good-enhancement-suggestion)
  - [Commit messages and Pull Request titles](#commit-messages-and-pull-request-titles)
    - [User-facing changes](#user-facing-changes)
    - [Internal changes](#internal-changes)
  - [Legal Notice](#legal-notice)

## Submitting issues

Github issues are welcome, feel free to submit error reports and feature requests! Make sure to add
enough details to explain your use case. If you require further assistance, you can also contact
Datadog [support][1].

## Pull Requests

Have you fixed a bug or written a new feature and want to share it? Many thanks!

In order to ease/speed up our review, here are some items you can check/improve when submitting your
pull request:

- Keep commits small and focused, rebase your branch if needed.
- Write unit and e2e tests for the code you wrote.
- Write meaningful [Commit messages and Pull Request
  titles](#commit-messages-and-pull-request-titles)

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. 
- Be aware that this repository is only a showcase and container of usage examples for Datadog's RUM browser-sdk. If your changes are related to the SDK itself, please refer to https://github.com/DataDog/browser-sdk

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues]([issues](https://github.com/DataDog/rum-react-integration/issues)).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to.
- **Explain why this enhancement would be useful** to most users. You may also want to point out the other projects that solved it better and which could serve as inspiration.


## Commit messages and Pull Request titles

Messages should be concise but explanatory. We are using a convention inspired by [gitmoji][2], to
label our Commit messages and Pull Request titles:

### User-facing changes

💥 - Breaking change.

✨ - New feature.

🐛 - Bug fix.

⚡️ - Performance improvement.

📝 - Documentation.

⚗ - Experimental.

### Internal changes

👷 - Updating project setup (continuous integration, build system, package dependencies...).

♻️ - Refactoring code.

🎨 - Improving structure / format of the code.

✅ - Updating tests.

👌 - Updating code due to code review changes.

## Legal Notice
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

[1]: https://docs.datadoghq.com/help/
[2]: https://gitmoji.carloscuesta.me/