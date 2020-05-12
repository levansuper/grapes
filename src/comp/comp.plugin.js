import GrapesJS from 'grapesjs';

export default GrapesJS.plugins.add('react-component', (editor, options) => {

  editor.DomComponents.addType("react-component",{
    isComponent: el => {
       if(el.class === 'gjs-react-component' ){
        return {
          type : 'react-component'
        }
      }
    },
    model: {
      init() {
        this.on('change:label', (a,b,c,d) => {
          const comps = this.get('components');      
          comps.reset();
          comps.add(renderComp(a));
          let html = "";
          const comp = this.find("Comp")[0]
          comp.get('components').each(child => {
            html+=child.toHTML()
          })
          comp.addAttributes({
            componentTemplate:html
          })
          console.log(comp, "1231231231231231256567")
 
        })
      
      },
      defaults: {
        tagName: 'div',
        attributes : {
          className:'gjs-react-component'
        },
        components: renderComp,
        label: "defaultvalue",
        traits: [{
          label: 'Label',
          name: 'label',
          changeProp: 1
        }]
      }
    }
  } );

    editor.BlockManager.add('react-component', {
      name:'react-component',
      label: 'React Component',
      category: 'React',
      content: {
        type: 'react-component',
      }

  });
})

const renderComp = (e) => {
          
  return  {
    selectable: false,
    tagName:'Comp',
    type:'Comp',
    attributes: {
      text: e.attributes.label,
      componentTemplate: ""
    },
    components: () => {
      return  {
        
        tagName: 'span',
        type: 'text',
        attributes: { title: 'foo' },
        
          content: `<span>${e.attributes.label}</span>`
        
      }
      
    }
  }
}