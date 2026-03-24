import { DeleteConceptById, GetCompositionListListener, NORMAL, UpdateComposition, PatcherStructure } from "mftsccs-browser";
import { StatefulWidget } from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";
import './todo.style.css';

export class ListTodo extends StatefulWidget {
    mytodos: any;
    inpage: number = 10;
    page: number = 1;

    before_render(): void {
        let userId: number = getLocalUserId();
        GetCompositionListListener("the_todo", userId, this.inpage, this.page, NORMAL).subscribe((output: any) => {
            this.mytodos = output;
            this.render(); 
        })
    }

    after_render() {
        let tableElement = this.getElementById("mainbody");
        if(tableElement && this.mytodos && this.mytodos.length > 0){
            for(let i = 0; i < this.mytodos.length; i++){
                let id = this.mytodos[i].the_todo?.id;

                if(id){
                    let row = document.createElement("tr");
                    let col1 = document.createElement("td");
                    let col2 = document.createElement("td");
                    let col3 = document.createElement("td");
                    
                    let title = document.createElement("span");
                    let titleValue = this.mytodos[i].the_todo.title;
                    title.innerHTML = titleValue;
                    
                    let edit = document.createElement("button");
                    edit.setAttribute('class', 'btn btn-primary');
                    edit.innerHTML = "Edit";
          
                    let del = document.createElement("button");
                    del.setAttribute('class', 'btn btn-danger');
                    del.innerHTML = "Delete";
                    
                    // Delete Logic
                    del.onclick = () => {
                        if(confirm("Are you sure you want to delete this task?")){
                            DeleteConceptById(id).then(() => {
                                console.log("Task Deleted");
                            });
                        }
                    }
                    
                    // Edit Logic
                    edit.onclick = () => {
                        // Popup to get new input
                        let newTaskName = window.prompt("Edit your task:", titleValue);
                        
                        if (newTaskName !== null && newTaskName !== "" && newTaskName !== titleValue) {
                            // Initialize the Patcher tool
                            let patcherStructure: PatcherStructure = new PatcherStructure();
                            
                            // Set ID of the task we are updating
                            patcherStructure.compositionId = Number(id);
                            
                            // Set the new data 
                            patcherStructure.patchObject = {
                                "title": newTaskName
                            };

                            // Update the backend
                            UpdateComposition(patcherStructure).then(() => {
                                console.log("Task updated successfully via popup");
                            }).catch((err) => {
                                console.error("Update failed:", err);
                            });
                        }
                    }

                    col1.append(title);
                    col2.append(edit);
                    col3.append(del);
          
                    row.appendChild(col1);
                    row.appendChild(col2);
                    row.appendChild(col3);
                    tableElement.append(row);
                }
            }
        }
    }

    getHtml(): string {
        return `<div>
            <table>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="mainbody"></tbody>
            </table>
        </div>`
    }
}