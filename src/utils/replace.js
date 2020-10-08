
export default (mongoDoc, customId) => {
    const newObject = JSON.parse(JSON.stringify(mongoDoc))
    const documentCopy = {
      ...newObject,
      [customId]: newObject._id
    };
  
    //remove not necessary fields for response
    delete documentCopy._id;
    delete documentCopy.__v;
    
    return documentCopy;
  };