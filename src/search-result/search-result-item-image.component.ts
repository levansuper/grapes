

export const addSearchResultItemImageComponent =  (editor: any, options: any) => {

  editor.DomComponents.addType("search-result-item-image",{
    isComponent: (el : any) => {
       if(el.class === 'gjs-search-result-item-image' ){
        return {
          type : 'search-result-item-image'
        }
      }
    },
    model: {
      defaults: {
        tagName: 'img',
        attributes : {
          className:'gjs-search-result-item-image',
          src:'https://media.gettyimages.com/photos/tbilisi-city-of-georgia-picture-id546242868'
        },
      },
      toHTML : function(a: any,b: any, c: any) {
        const me = (this as any);
        return `<img src={image} id="${me.ccid}" />`;
      },
    }
  } );

}