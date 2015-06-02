module.exports = {
  scenarios: [
    {
      name: "default",
      dependencies: {}
    },
    {
      name: "Release",
      dependencies: {
        "ember": "release"
      }
    },
    {
      name: "Ember canary",
      dependencies: {
        "ember": "canary"
      }
    },
    {
      name: "Ember beta",
      dependencies: {
        "ember": "beta"
      }
    }
  ]
};
