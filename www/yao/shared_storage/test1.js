class TestTestTest {
  async run(urls, options) {
    if (options.name == "experimentA") {
      return 1;
    } else {
      return 2; 
    }
  }
}

registerURLSelectionOperation("test-operation", TestTestTest);

sharedStorage.set("key", "value");
