import { CreateTheConnectionLocal, LocalSyncData, MakeTheInstanceConceptLocal, PatcherStructure, PRIVATE, UpdateComposition } from "mftsccs-browser";
import { StatefulWidget } from "mftsccs-browser";
import './todo.style.css';
import { getLocalUserId } from "../user/login.service"; 

export class CreateTodo extends StatefulWidget {

    after_render(): void {
        let userId: number = getLocalUserId();
        let order: number = 1;
        let title = this.getElementById("title") as HTMLInputElement;
        let id = this.getElementById("id") as HTMLInputElement;

        if(this.data){
            title.value = this.data.title;
            id.value = this.data.id;
        }

        let submitButton = this.getElementById("submit");
        if(submitButton){
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();
    
                if(id.value){
                    // Edit
                    let patcherStructure: PatcherStructure = new PatcherStructure();
                    patcherStructure.compositionId = Number(id.value);
                    patcherStructure.patchObject = {
                        "title": title.value
                    }
                    UpdateComposition(patcherStructure);
                    title.value = ""; 
                    id.value = "";
                }
                else{
                    // Create
                    // Create empty container 
                    MakeTheInstanceConceptLocal("the_todo", "", true, userId, PRIVATE).then((mainconcept) => {
                        // Create text value 
                        MakeTheInstanceConceptLocal("title", title.value, false, userId, PRIVATE).then((concept) => {
                            // Connect title to the main container
                            CreateTheConnectionLocal(mainconcept.id, concept.id, mainconcept.id, order, "", userId).then(() => {
                                LocalSyncData.SyncDataOnline();
                                title.value = ""; // Clear input after creation
                            });
                        });
                    });
                }
            }
        }
    }

    getHtml(): string {
        return `<div class="container">
            <form>
                <div>
                    <input type="number" id="id" hidden>
                    <div class="formbody">
                        <label>Task</label>
                        <input type="text" id="title" placeholder="Enter your task here...">
                    </div>
                    <button class="btn btn-primary" id="submit" type="submit">Save Task</button>
                </div>
            </form>
        </div>`
    }
}