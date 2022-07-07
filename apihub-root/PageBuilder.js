import defaultData from "./assets/defaultValues.js"
const configureFilePath="./assets/configure.json";

const randomGenerator=((length)=>length>1? Math.floor(Math.random() * length) : 0);

class MediaScreenWidth{
    constructor(items){
        this.elements=items;
    }
    execute(){
        document.documentElement.style.setProperty('--elements-per-row', this.elements);
        switch(this.elements){
            case 1:
                document.documentElement.style.setProperty('--elements-per-row-1200px',"1");
                document.documentElement.style.setProperty('--elements-per-row-900px',"1");
                document.documentElement.style.setProperty('--elements-per-row-600px',"1");
                break;
            case 2:
                document.documentElement.style.setProperty('--elements-per-row-1200px',"2");
                document.documentElement.style.setProperty('--elements-per-row-900px',"2");
                document.documentElement.style.setProperty('--elements-per-row-600px',"1");
                break;
            case 3:
                document.documentElement.style.setProperty('--elements-per-row-1200px',"3");
                document.documentElement.style.setProperty('--elements-per-row-900px',"2");
                document.documentElement.style.setProperty('--elements-per-row-600px',"1");
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
class PageBuilder {
    constructor(dataDefault) {
        this.defaultData=dataDefault;
        this.buttonContainer=this.createElement("div","main-container");
        document.querySelector("body").append(this.buttonContainer);
    }

    createElement(selector, className) {
        const element = document.createElement(selector)
        if (className) element.classList.add(...className.split(" "))
    
        return element
    }


    chooseBackground(names){
        let backgroundImage="url(";
        backgroundImage+="'"+names[randomGenerator(names.length)]+"')";

        return backgroundImage;
    }
    
    createButtons(data){
        document.body.style.backgroundImage=this.chooseBackground(data.background);
        data["menu-items"].forEach((element,index) => {
            for (var key of Object.keys(data.default_item)){
                if (!element.hasOwnProperty(key)||element[key]=="") {
                    let defaultValues=data.default_item[key];
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
        else throw new Error(`File path ${configureFilePath} is invalid. Please check your configuration file.`);
    })
    .then(data=>{
        let model=new Model(data);
        let view=new PageBuilder(defaultData);
        view.loadButtons(model.getData());
    })
    .catch(error=>{
        sessionStorage.setItem("error-message",error)
        document.location.href="errorPage.html";
    })





