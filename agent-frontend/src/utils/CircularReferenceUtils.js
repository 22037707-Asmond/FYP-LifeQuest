export const removeCircularReferences = (obj) => {
    const seen = new WeakSet();
  
    const recurse = (value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
  
        if (Array.isArray(value)) {
          return value.map(recurse);
        } else {
          const newObj = {};
          for (const key in value) {
            newObj[key] = recurse(value[key]);
          }
          return newObj;
        }
      }
      return value;
    };
  
    return recurse(obj);
  };
  