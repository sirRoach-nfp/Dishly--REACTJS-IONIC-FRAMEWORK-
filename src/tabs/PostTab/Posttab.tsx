
import {   IonTabs,IonTabBar,
    IonTabButton,IonContent,useIonToast, IonHeader, IonPage, IonTitle, IonToolbar,IonBreadcrumbs,IonButton, 
    IonRouterOutlet,
    IonIcon,
    IonInput,IonList, IonItem, IonSelect, IonSelectOption,
    IonTextarea,useIonLoading} from '@ionic/react';

import { addDoc, arrayUnion, collection, doc, getDoc,updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './posttab.scss'

import { useState} from 'react';




import { trashOutline } from 'ionicons/icons';

import { cameraOutline } from 'ionicons/icons';
import IngredientInput from '../../components/IngredientInput/Ingredientinput';
import { db } from '../../firebaseConfig';
import axios from 'axios';
const Posttab: React.FC = () =>{


    const userDocId = localStorage.getItem("userDocId") as string

    const [ingredients,setIngredients] = useState<{id:number;name:string;quantity:string}[]>([]);
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [file,setFile] = useState<File | null> (null);
    const [procedure,setProcedure] = useState("")
    const [mainCategory,setMainCategory] = useState("")
    const [subCategory,setSubCategory] = useState("")
    const [loading,setLoading] = useState(false)
    const [serving,setServing] = useState("")
    const [prepTime,setPrep] = useState("")
    const [uploading,setUploading] = useState(false)
    const [uploadedUrl,setUploadedUrl] = useState("")

    const [present] = useIonToast()
    const [presentLoad,dismiss] = useIonLoading()
    const username = localStorage.getItem("username") as string


    const fileToBase64 = (file:File) => {

        return new Promise((resolve,reject) => {

            const reader = new FileReader();
            reader.onloadend = () => {

                if(typeof reader.result === 'string'){
                    resolve(reader.result.split(',')[1])
                } else { reject(new Error("Failed"))}
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
        })


    }

    const handleServing = (event:CustomEvent) => {
        let newServe = event.detail.value
        console.log("New serve ", newServe)
        setServing(newServe)
    }

    const handlePrepTime = (event:CustomEvent) => {
        let newPrep = event.detail.value
        console.log("New serve ", newPrep)
        setPrep(newPrep)
    }

    const handleUpdate = async() => {


        const itemsArr = ingredients

        
        if(title.length < 5){
            present({
                message: 'Recipe title should be longer than 5 characters',
                duration: 1500,
                position: "top",
              
                color:"danger" 
                });

            return
        }

        if(description.length <= 50){


            present({
                message: 'Description should be longer than 50 characters',
                duration: 1500,
                position: "top",
              
                color:"danger" 
                });

            return
            
        }

        
        if(ingredients.length <= 0){


            present({
                message: 'Ingredients cannot be empty',
                duration: 1500,
                position: "top",
              
                color:"danger" 
                });

            return
            
        }



        if(procedure.length <= 50){


            present({
                message: 'Procedure cannot be shorter than 50 characters',
                duration: 1500,
                position: "top",
              
                color:"danger" 
                });

            return
            
        }

        if(mainCategory.length <= 0){


            present({
                message: 'Select a main category for your recipe',
                duration: 1500,
                position: "top",
              
                color:"danger" 
                });

            return
            
        }


        if(subCategory.length <= 0){


            present({
                message: 'Select a sub category for your recipe',
                duration: 1500,
                position: "top",
              
                color:"danger" 
                });

            return
            
        }

        if(file === null){
            present({
                message: 'Select a snapshot for your recipe',
                duration: 1500,
                position: "top",
              
                color:"danger" 
                });

            return

        }



        const userDocRef = doc(db,'users',userDocId);
     

        presentLoad({
            message: 'Uploading Post...',
          })

        try{



            setUploading(true)
            setLoading(true)
            const formData = new FormData();
            formData.append("file",file);
            formData.append("upload_preset","dishlyunsignedpreset")

            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dvl7mqi2r/image/upload',
                {
                    method:"POST",
                    body: formData
                }
            )

            const data = await response.json();


            
            
            if (response.ok) {
                setUploadedUrl(data.secure_url); // Set the uploaded image URL
                
                const recipeData = {
                    recipeId: Date.now().toString(),
                    title: title,
                    description: description,
                    mainCategory: mainCategory,
                    subCategory:subCategory,
                    items: ingredients,
                    recipeCover: data.secure_url,
                    procedure: procedure,
                    serving: serving,
                    prep: prepTime,
                    author:username,
                }


                await addDoc(collection(db,'recipes'),recipeData)

                await updateDoc(userDocRef,{
                    yourRecipes: arrayUnion(recipeData)
                })

                setTitle("");
                setDescription("");
                setIngredients([])
                setFile(null)
                setProcedure("")
                setMainCategory("")
                setSubCategory("")
                setProcedure("")
                setLoading(false)
                setServing("")
                setPrep("")


                present({
                    message: 'Recipe posted successfully',
                    duration: 3500,
                    position: "top",
                
                    color:"success" 
                    });
            
            } else {
                console.error("Upload failed:", data);
                alert("Upload failed. Please try again.");
            }
                    



  








            

            


        }catch(err){
            console.error(err)
        } finally {
            setUploading(false)
            dismiss()

        }



    }



    const handleMainCategory = (event:CustomEvent) => {
        console.log(event.detail.value)
        setMainCategory(event.detail.value)
    }
    const handleSubCategory = (event:CustomEvent) => {
        setSubCategory(event.detail.value)
    }

    const handleProcedure = (event: CustomEvent) => {
        let newProc = event.detail.value

        newProc = newProc.trim().replace(/[^\S\r\n]+/g, " ")
        console.log("process value ", newProc)
        setProcedure(newProc)
    }
    const handleTitleChange = (event: CustomEvent)=> {
        const newTitle = event.detail.value;
        setTitle(newTitle)

    }

    const handleDescriptionChange = (event: CustomEvent) => {
        let newDescription = event.detail.value

        newDescription = newDescription.trim().replace(/\s+/g, " ")
        console.log("process value ", newDescription)
        setDescription(newDescription)
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]


        if(!selectedFile?.type.startsWith("image/")) {
            console.log("not valid");
            return;
        }


        if(selectedFile.size > 5 * 1024 * 1024){
            console.log("image size is too big")
            return
        }

        setFile(selectedFile)
    }


    const handleAddIngredient = () =>{
        setIngredients((prev) =>[
            ...prev,
            {id:Date.now(),name:'',quantity:''},



        ])

    }


    const handleIngredientChange = (id:number,field:'name'|'quantity',value:string)=>{
        setIngredients((prev)=>

            prev.map((ingredient)=> 
                ingredient.id == id? {...ingredient,[field]:value}:ingredient
            )
            
        );
    }

    const handleDeleteIngredient = (id: number) => {
        setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
      };
    



    return(
        <IonPage>

            <IonContent>

                <div className="postContainer">

                    <div className="headerDivP">
                        <h4 className="headerP">Share Your Recipe</h4>
                    </div>




                    <div className="recipesnapshotDivP">


                        <label htmlFor="file"><IonIcon icon={cameraOutline} className='uploadIconP'/></label>
                        <input type="file" id="file" style={{display: "none"}} onChange={handleFileChange} className='inputElem'/>
                        {file && (

                            <img src={URL.createObjectURL(file)} alt="" className="coverImg" />


                        )}
                    </div>



                    


                    <div className="selectDivP">
                        <h5 className="selectHeader">Main Category</h5>
                        <IonList className='selectListWrapper'>
                            <IonItem className='ionItemCustom'>
                                <IonSelect interface="modal" placeholder="Select Main Category" className='selectOptionCustom' onIonChange={(e) => handleMainCategory(e)}>
                                    <IonSelectOption value="QuickAndEasy" className='ionOptionCustom'>Quick and Easy</IonSelectOption>
                                    <IonSelectOption value="HealthyChoices" className='ionOptionCustom'>Healthy Choices
                                    </IonSelectOption>
                                    <IonSelectOption value="GlobalCuisines" className='ionOptionCustom'>Global Cuisines</IonSelectOption>
                                    <IonSelectOption value="DessertsAndSweets" className='ionOptionCustom'>Desserts and Sweets</IonSelectOption>
                                    <IonSelectOption value="BreakfastIdeas" className='ionOptionCustom'>Breakfast Ideas</IonSelectOption>
                                    <IonSelectOption value="ComfortFoods" className='ionOptionCustom'>Comfort Foods</IonSelectOption>

                                </IonSelect>
                            </IonItem>
                        </IonList>
                    </div>


                    
                    <div className="selectDivP">
                        <h5 className="selectHeader">Sub Category</h5>
                        <IonList className='selectListWrapper'>
                            <IonItem className='ionItemCustom'>
                                <IonSelect interface="modal" placeholder="Select Main Category" className='selectOptionCustom' onIonChange={(e)=>handleSubCategory(e)}>
                                    <IonSelectOption value="Pasta" className='ionOptionCustom'>Pasta</IonSelectOption>
                                    <IonSelectOption value="Poultry" className='ionOptionCustom'>Poultry
                                    </IonSelectOption>
                                    <IonSelectOption value="RedMeat" className='ionOptionCustom'>Red Meat</IonSelectOption>
                                    <IonSelectOption value="Seafood" className='ionOptionCustom'>Seafood</IonSelectOption>
                                    <IonSelectOption value="Soup" className='ionOptionCustom'>Soup</IonSelectOption>
                                    <IonSelectOption value="BakedGoods" className='ionOptionCustom'>Baked Goods</IonSelectOption>
                                    <IonSelectOption value="Sweets" className='ionOptionCustom'>Sweets</IonSelectOption>
                                    <IonSelectOption value="Vegetarian" className='ionOptionCustom'>Vegetarian</IonSelectOption>
                                    <IonSelectOption value="RiceAndGrains" className='ionOptionCustom'>Rice And Grains</IonSelectOption>

                                </IonSelect>
                            </IonItem>
                        </IonList>
                    </div>


                    <div className="prepservediv">
                        <IonInput label="Prep Time (Minutes)" type="number" placeholder="000" min="1" max="100" className='prepInput' onIonChange = {(e)=> handlePrepTime(e)}></IonInput>
                        <IonInput label="Servings" type="number" placeholder="000" min="1" max="50" className='prepInput' onIonChange={(e)=> handleServing(e)}></IonInput>
                    </div>
                    <div className="addRecipeContainer">
                 

                        <div className="ingredientsContainer">

                            {ingredients.map((ingredient) => (
                                <IngredientInput 
                                    key={ingredient.id}
                                    id={ingredient.id}
                                    name={ingredient.name}
                                    quantity={ingredient.quantity}
                                    onDelete={handleDeleteIngredient}
                                    onChange={handleIngredientChange}
                                />
                            ))}


                        </div>
                        
                        <IonButton className='ingredientButton' onClick={handleAddIngredient}> Add ingredient </IonButton>


                    </div>

                    <div className="inputFieldsDivP">

                        <h5 className="inputFieldsHeader">Recipe Title</h5>
                        <IonInput label="Your Recipe Name" labelPlacement="floating" fill="solid" placeholder="Enter recipe name..." clearInput={true} className='inputsChangeFontP' onIonChange={(e)=>handleTitleChange(e)} value={title}></IonInput>

                        <h5 className="inputFieldsHeader">Recipe Description</h5>


                        <IonTextarea className='textAreaCustomP' label="Short description of your recipe" labelPlacement="floating" fill="solid" placeholder="Recipe description..." autoGrow={true} counter={true} onIonChange={(e)=>handleDescriptionChange(e)}
                        maxlength={550} counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`} value={description}>

                        </IonTextarea>

                        
                        <h5 className="inputFieldsHeader">Procedure</h5>

                        <IonTextarea className='textAreaCustomP' value={procedure} label="Recipe procedure" labelPlacement="floating" fill="solid" placeholder="Recipe procedure..." autoGrow={true} onIonChange={(e)=> handleProcedure(e)}>

                        </IonTextarea>



                    </div>

                    <IonButton onClick={handleUpdate} className='saveButton'>Post Your Recipe</IonButton>





                </div>

            </IonContent>

        </IonPage>
    )
}

export default Posttab;