import defaultData from "./assets/defaultValues.js"
import defaultProperties from "./defaultProperties.js";

const configureFilePath="./assets/configure.json";
const randomGenerator=((length)=>length>1? Math.floor(Math.random() * length) : 0);

class MediaScreenWidth{
    constructor(items){
        this.elements=items;
    }
    execute(){
        document.documentElement.style.setProperty('--my-elements-per-row', this.elements);
        switch(this.elements){
            case 1:
                document.documentElement.style.setProperty('--my-width1',"calc((100% - var(--my-margin) * 2)/1)");
                document.documentElement.style.setProperty('--my-width2',"calc((100% - var(--my-margin) * 2)/1)");
                document.documentElement.style.setProperty('--my-width3',"calc((100% - var(--my-margin) * 2)/1)");
                break;
            case 2:
                document.documentElement.style.setProperty('--my-width1',"calc((100% - var(--my-margin) * 4)/2)");
                document.documentElement.style.setProperty('--my-width2',"calc((100% - var(--my-margin) * 4)/2)");
                document.documentElement.style.setProperty('--my-width3',"calc((100% - var(--my-margin) * 2)/1)");
                break;
            case 3:
                document.documentElement.style.setProperty('--my-width1',"calc((100% - var(--my-margin) * 6)/3)");
                document.documentElement.style.setProperty('--my-width2',"calc((100% - var(--my-margin) * 4)/2)");
                break;
            default:
                
        }
    }
}

class Model {
    constructor(data) {
        this.fileJson=data;
    }
    getData(){
        return this.fileJson;
    }


};
class View {
    constructor(dataDefault,defaultProperties) {
        this.defaultProperties=defaultProperties.properties;
        this.defaultData=dataDefault;
        this.buttonContainer=this.createElement("div","main-container");
        document.querySelector("body").append(this.buttonContainer);
    }

    createElement(selector, className) {
        const element = document.createElement(selector)
        if (className) element.classList.add(...className.split(" "))
    
        return element
    }

    emptyPage(){
        while(this.buttonContainer.firstChild){
            this.buttonContainer.removeChild(this.buttonContainer.firstChild);
        }
    }

    chooseBackground(names){
        let backgroundImage="url(";
        backgroundImage+="'"+names[randomGenerator(names.length)]+"')";

        return backgroundImage;
    }
    
    createButtons(data){
        document.body.style.backgroundImage=this.chooseBackground(data.background);
        data["menu-items"].forEach((element,index) => {
            for (var key of this.defaultProperties){
                if (!element.hasOwnProperty(key)||element[key]=="") {
                    let defaultValues=this.defaultData[key];
                    let index=randomGenerator(defaultValues.length);
                    element[key]=defaultValues[index];
                }
                
            }
            let divContainer=this.createElement("div","anchor-container");
            if (data["menu-items"].length<4) 
            {
                let helper=new MediaScreenWidth(data["menu-items"].length);
                helper.execute();
            }
            
            let anchor=this.createElement("a");
            anchor.setAttribute('href',element.href);
            anchor.style.backgroundColor=element.background_color;
            let image=this.createElement("i",element.icon);
            anchor.append(image);

            let label=this.createElement("p","below-button");
            label.innerHTML=element.label;
            
            divContainer.append(anchor,label);

            this.buttonContainer.append(divContainer);
        });
        
    }

    loadButtons(data){
        var myData=Object.assign({},this.defaultData,data);
        try{
            this.emptyPage();
            this.createButtons(myData);
        }
        catch(error){
            console.debug(error); 
        }
    }
}

fetch(configureFilePath)
    .then(response=>{
        if(response.ok) return response.json();
        else throw new Error("File not found");
    })
    .then(data=>{
        let model=new Model(data);
        let view=new View(defaultData,defaultProperties);
        view.loadButtons(model.getData());
    })
    .catch(error=>{
        document.location.href="errorPage.html"
    })





