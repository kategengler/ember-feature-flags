# Release Process

The following is the release process you should follow to publish a new version of `ember-feature-flags`.

## Update The Changelog

First, we need to update the `CHANGELOG.md` file for the project. We do this via the [lerna-changelog](https://github.com/lerna/lerna-changelog). This requires all PRs to be labeled appropriately. Use the following command to generate the changelog from the most recent tag:

```bash
yarn changelog
```

Copy the output into `CHANGELOG.md`, where you replace the `Unreleased` with the appropriate version you are publishing.

_Note: Ensure you set up a GitHub Token (as GITHUB_AUTH environment variable) when using the changelog generator, or else it will not work properly._

Review the changes and then commit them with a message like:

```bash
git commit -am "Update CHANGELOG for vx.x.x."
```

## Bump The Version

Next, we bump the version of the addon and tag it. You can do this by using the default `npm version` command, like so:

```bash
npm version x.x.x
```

That should bump the version in `package.json`, commit it, and then tag it. Be sure to push the commit and tag.

## Publish
Next, push the version bump and the changelog changes to the repository. Upon successful build of the tag, Travis CI will publish to `npm`.


**This RELEASE.md shamelessly cribbed from `ember-cli-qunit`**
