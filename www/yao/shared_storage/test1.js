class TestTestTest {
  async run(urls, options) {
//     return 2;
    
    return sharedStorage.set("key333", "value333");
    
//     if (options.name == "experimentA") {
//       return 1;
//     } else {
//       return 2; 
//     }
  }
}

registerURLSelectionOperation("test-operation", TestTestTest);
