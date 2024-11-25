import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth-service.service';
import { ProgramService } from '../../services/program.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Program } from '../../interface/Program';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, FooterComponent, FormsModule, RouterLink],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent implements OnInit{

  listPrograms!: Array<Program>;
  @ViewChild("myModalConf", {static: false}) myModalConf!:TemplateRef<any>
  modalTitle!:string;

  modelProgram: Program;

  constructor(
    private authService: AuthService, 
    private programService: ProgramService,
    private ngbModal: NgbModal,

  ){
    this.modelProgram = {
      id:0,
      name:""
    };
  }

    
  ngOnInit(): void {
    this.authService.authMethod();
    this.request();
  }

  /**
   * Obtener datos de los programas 
   */
  request(){
    this.programService.getPrograms(this.authService.getToken()).subscribe({
      next:data => {
        this.listPrograms = data;
      }, error:error =>{
        console.log('Error: '+ error.message)
      }
      
    });
  }

  /**
   * abrir modal agregar
   */
  addModal(){
    this.ngbModal.open(this.myModalConf, {size: 'lg'});
    this.modalTitle="Add";
    this.modelProgram = {
      id:0,
      name:""
    };
  }

  /**
   * abrir modal editar
   */
  editModal(data:Program){
    this.ngbModal.open(this.myModalConf, {size: 'lg'});
    this.modalTitle="Edit";
    this.modelProgram = {
      id:data.id,
      name:data.name
    };
  }

  send(){
    if(this.modalTitle == "Add"){
      this.programService.addProgram({ name: this.modelProgram.name },this.authService.getToken()).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Se creo el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/programs";
          }, 2000);
        },error:error => {
          console.log('Error: ' + error.message);
        }
        
      });
    }
    if(this.modalTitle == "Edit"){
      this.programService.editProgram({ name:this.modelProgram.name },this.authService.getToken(), this.modelProgram.id).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Se edito el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/programs";
          }, 2000);
        },error:error => {
          console.log('Error: ' + error.message);
        }
        
      });
    }
  }

  delete(data:Program){
    this.modelProgram = {
      id:data.id,
      name:""
    };
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
        this.programService.deleteProgram(this.authService.getToken(), this.modelProgram.id as number ).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Se elimino el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/programs";
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
