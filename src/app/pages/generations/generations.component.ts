import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramService } from '../../services/program.service';
import { Program } from '../../interface/Program';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerationService } from '../../services/generation.service';
import { Generation } from '../../interface/generation';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-generations',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './generations.component.html',
  styleUrl: './generations.component.css'
})
export class GenerationsComponent implements OnInit{


  generationForm = this.formBuilder.group({
    name: ["", Validators.required],
    id_program: [0, Validators.required]
  })

  generationModel: {
    id:number,
    name:string,
    program:{
      id:number,
      name:string
    }
  }

 

  listPrograms!: Array<Program>;
  listGenerations!: Array<Generation>;
  @ViewChild("myModalConf", {static: false}) myModalConf!:TemplateRef<any>
  modalTitle!: string;

  constructor(
    private authService: AuthService, 
    private generationService: GenerationService,
    private programService: ProgramService,
    private ngbModal: NgbModal,
    private formBuilder: FormBuilder
  ){
    this.generationModel = {
    id:0,
    name: "",
    program:{
      id: 0,
      name:""
    }
  }
  }

  ngOnInit(): void {
    this.authService.authMethod();
    this.requestPrograms();
    this.requestGenerations();
  }

  addModal(){
    this.ngbModal.open(this.myModalConf, {size: 'lg'});
    this.modalTitle="Add";
    this.generationForm.reset();
  }

  /**
   * Obtener datos de los programas 
   */
  requestPrograms(){
    this.programService.getPrograms(this.authService.getToken()).subscribe({
      next:data => {
        this.listPrograms = data;
      }, error:error =>{
        console.log('Error: '+ error.message)
      }
      
    });
  }

  requestGenerations(){
    this.generationService.getGenerations(this.authService.getToken()).subscribe({
      next:data => {
        this.listGenerations = data;
      }, error:error =>{
        console.log('Error: '+ error.message)
      }
      
    });
  }

  // editModal(data:any){
  //   this.ngbModal.open(this.myModalConf, {size: 'lg'});
  //   this.modalTitle="Edit";
  //   this.modelProgram = {
  //     id:data.id,
  //     name:data.name
  //   };
  // }
  
  send(){
    if(this.modalTitle == "Add"){
      this.generationService.addGeneration({
        name: this.generationForm.get("name")?.value as string, program:{id: this.generationForm.get("id_program")?.value as number}}, 
        this.authService.getToken()).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Se creo el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/generations";
          }, 2000);
        },error:error => {
          console.log('Error: ' + error.message);
        }
      });
    }
  }

  delete(data:any){
    this.generationModel = {
    id:data.id,
    name: "",
    program:{
      id: 0,
      name:""
      }
    }
    Swal.fire({
      position: 'center',
      title: '¿esta seguro que desea eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then( async (result) => {
      if(result.isConfirmed){
        this.generationService.deleteGeneration(this.authService.getToken(), this.generationModel.id ).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Se elimino el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/generations";
          }, 1000);
        },error:error => {
          console.log('Error: ' + error.message);
        }
      });  
      }
    });
  }

  /**
   * Funcionalidad para cerrar el modal
   */
  closeModal(){
    this.ngbModal.dismissAll();
  }

}
