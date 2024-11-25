import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { max } from 'rxjs';
import { Generation } from '../../interface/generation';
import { GenerationService } from '../../services/generation.service';
import { SpecialityService } from '../../services/speciality.service';
import { Pandawan } from '../../interface/pandawan';
import { PandawanService } from '../../services/pandawan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pandawans',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MenuComponent, RouterLink , ReactiveFormsModule],
  templateUrl: './pandawans.component.html',
  styleUrl: './pandawans.component.css'
})
export class PandawansComponent implements OnInit {

  pandawanForm = this.formBuilder.group({
    name: ["", Validators.required],
    discord_user: ["", Validators.required],
    email: ["", [Validators.required,Validators.email]],
    phone_number: ["", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    date_birth: ["", Validators.required],
    gender: ["", Validators.required],
    generation: ["", Validators.required],
    speciality: "",
    programEmail: ""
  })

  listSpecialities!: Array<any>;
  listGenerations!: Array<Generation>;
  listPandawans!: Array<Pandawan>;
  @ViewChild("myModalConf", {static: false}) myModalConf!:TemplateRef<any>
  modalTitle!:string;
  idEdit: number;

  modelPandawan: Pandawan;

  constructor(
    private authService: AuthService,
    private ngbModal: NgbModal,
    private formBuilder: FormBuilder,
    private generationService: GenerationService,
    private specialityService: SpecialityService,
    private pandawanService: PandawanService,
  ){

    this.modelPandawan = {
      id: 0,
      name: "",
      discordUser: "",
      email: "",
      phoneNumber: "",
      dateBirth:"",
      gender:"",
      generation: {
        id: 0,
      },
      speciality:{
        id:0,
      },
      programEmail:""
    };

    this.idEdit = 0;
   
  }

  
  ngOnInit(): void {
    this.authService.authMethod();
    this.requestGenerations();
    this.requestSpecialitys();
    this.requestPandawans();
  }

  requestPandawans(){
    this.pandawanService.getPandawans(this.authService.getToken()).subscribe({
      next: data => {
        this.listPandawans = data;
        console.log(data)
      }, error:error =>{
        console.log('Error: '+ error.message)
      }

    })
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

  addModal(){
    this.ngbModal.open(this.myModalConf, {size: 'lg'});
    this.modalTitle="Add";
   
  }

  editModal(data:Pandawan){
    this.ngbModal.open(this.myModalConf, {size: 'lg'});
    this.modalTitle="Edit";
    this.idEdit = Number(data.id);
    this.pandawanForm.patchValue({
      name: data.name,
      discord_user: data.discordUser,
      email: data.email,
      phone_number: data.phoneNumber,
      date_birth: data.dateBirth,
      gender: String ( data.gender),
      generation: String(data.generation.id),
      speciality: String(data.speciality?.id),
      programEmail: data.programEmail,
    });
  }

  send(){
    if(this.modalTitle == "Add"){
      this.pandawanService.addPandawan(this.modelPandawan = {
        name: this.pandawanForm.get("name")?.value as string,
        discordUser: this.pandawanForm.get('discord_user')?.value as string,
        email: this.pandawanForm.get('email')?.value as string,
        phoneNumber: this.pandawanForm.get('phone_number')?.value as string,
        dateBirth: this.pandawanForm.get('date_birth')?.value as string,
        gender: this.pandawanForm.get('gender')?.value as string, 
        generation: {
          id: Number(this.pandawanForm.get('generation')?.value)
        } ,
        speciality: {
          id:0
        }, 
        programEmail: ""
        }, this.authService.getToken()).subscribe({
          next: data => {
            Swal.fire({
              icon: 'success',
              title: 'OK',
              text: "Se creo el registro exitosamente"
            });
            setInterval(() => {
              window.location.href = "/pandawans";
            }, 2000);
          },error:error => {
            console.log('Error: ' + error.message);
          }
      });
    }
    if(this.modalTitle == "Edit"){
      this.pandawanService.editPandawan(
        this.modelPandawan = { 
          name: this.pandawanForm.get("name")?.value as string,
          discordUser: this.pandawanForm.get('discord_user')?.value as string,
          email: this.pandawanForm.get('email')?.value as string,
          phoneNumber: this.pandawanForm.get('phone_number')?.value as string,
          dateBirth: this.pandawanForm.get('date_birth')?.value as string,
          gender: this.pandawanForm.get('gender')?.value as string, 
          generation: {
            id: Number(this.pandawanForm.get('generation')?.value)
          } ,
          speciality: {
            id:Number(this.pandawanForm.get('generation')?.value)
          }, 
          programEmail: this.pandawanForm.get('programEmail')?.value as string

        },this.authService.getToken(), 
        this.idEdit).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Se edito el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/pandawans";
          }, 2000);
        },error:error => {
          console.log('Error: ' + error.message);
        }
      });
    }
  }


  delete(data:Pandawan){
    this.idEdit= Number(data.id);
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
        this.pandawanService.deletePandawan(this.authService.getToken(), this.idEdit ).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            title: 'OK',
            text: "Se elimino el registro exitosamente"
          });
          setInterval(() => {
            window.location.href = "/pandawans";
          }, 1000);
        },error:error => {
          console.log('Error: ' + error.message);
        }
      });  
      }
    });
  }

  /**
  *cerrar modal
  */
   closeModal(){
    this.ngbModal.dismissAll();
  }


}
