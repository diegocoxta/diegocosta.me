---
title: Force update of all your Homebrew casks in macOS
date: '2020-01-18T23:12:03.284Z'
description: A simple way to force an upgrade to your applications installed via Homebrew.
tags: ['Terminal', 'MacOS', 'Homebrew', 'Caskroom', 'English']
---

I'm addicted to maintaining all my programs updated and the best way to do this in macOS is with the help of dependency managers like [Homebrew](https://brew.sh/index_pt-br), when using it to install our software you can write small scripts to automate this process.

In Homebrew the command to update all software is `brew cask upgrade` but it's not always successful to find updates for all applications, to fix this problem we must execute this upgrade command for every installed software.

Here's the tip! To avoid having to run `upgrade` to each item manually, run this command in your terminal:

```shell
for cask in $(brew cask list); do brew cask upgrade $cask; done;
```

With this script, we use the `for` to iterate in each item returned by the `brew cask list` command and force the update.
