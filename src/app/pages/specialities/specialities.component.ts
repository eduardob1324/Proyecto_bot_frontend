import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Program } from '../../interface/Program';
import { FormsModule } from '@angular/forms';
import { SpecialityService } from '../../services/speciality.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-specialities',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, FooterComponent, FormsModule, RouterLink],
  templateUrl: './specialities.component.html',
  styleUrl: './specialities.component.css'
})
export class SpecialitiesComponent implements OnInit{

  listSpecialities!: Array<any>;
   @ViewChild("myModalConf", {static: false}) myModalConf!:TemplateRef<any>
  modalTitle!:string;
  modelSpeciality: Program;

  constructor(
    private authService: AuthService,
    private ngbModal: NgbModal,
    private specialityService: SpecialityService,
  ){

    this.modelSpeciality ={
      id: 0,
      name: ""
    }
  }

   ngOnInit(): void {
    this.authService.authMethod();
    this.requestSpecialitys();
  }

  /**
   * abrir modal agregar
   */
  addModal(){
    this.ngbModal.open(this.myModalConf, {size: 'lg'});
    this.modalTitle="Add";
    this.modelSpeciality = {
      id:0,
      name:""
    };
  }

  editModal(data:Program){
    this.ngbModal.open(this.myModalConf, {size: 'lg'});
    this.modalTitle="Edit";
    this.modelSpeciality = {
      id:data.id,
      name:data.name
    };
  }

  /**
   * Obtener datos de las Specialidades
   */
  requestSpecialitys(){
    this.specialityService.getSpecialitys(this.authService.getToken()).subscribe({
      next:data => {
        console.log(data)
        this.listSpecialities = data;
      }, error:error =>{
        console.log('Error: '+ error.message)
      }
    });
  }

  /**
   *cerrar modal
   */
  closeModal(){
    this.ngbModal.dismissAll();
  }

  save(){
    if(this.modalTitle == "Add"){
      this.specialityService.addSpeciality({ name: this.modelSpeciality.name },this.authService.getToken()).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Se creo el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/specialities";
          }, 2000);
        },error:error => {
          console.log('Error: ' + error.message);
        } 
      });
    }
    if(this.modalTitle == "Edit"){
      this.specialityService.editSpeciality({ name:this.modelSpeciality.name },this.authService.getToken(), this.modelSpeciality.id).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Se edito el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/specialities";
          }, 2000);
        },error:error => {
          console.log('Error: ' + error.message);
        }
      });
    }
  }


  /**
   *eliminar specialidad
   */
  delete(data:Program){
    this.modelSpeciality = {
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
        this.specialityService.deleteSpeciality(this.authService.getToken(), this.modelSpeciality.id as number ).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Se elimino el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/specialities";
          }, 1000);
        },error:error => {
          console.log('Error: ' + error.message);
        }
      });  
      }
    });
  }

  

}
