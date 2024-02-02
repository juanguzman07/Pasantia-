import { Component, OnDestroy, OnInit, Input, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { CargueExcelService } from 'src/app/services/file/cargue-excel.service';
import { NotasService } from 'src/app/services/nota/notas.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  userLoginOn: boolean = false;
  userData?: User;
  selectedFile: File | null = null;
  registros: any[] = [];
  chart: any;

  constructor(
    private loginService: LoginService,
    private apiServicefile: CargueExcelService,
    private apiServiceNota: NotasService
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.apiServicefile.uploadFile(formData).subscribe(
        (response) => {
          console.log('Archivo subido con éxito:', response);
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
        }
      );
    } else {
      console.warn('Selecciona un archivo antes de subirlo.');
    }
  }

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.apiServiceNota.getRegistros().subscribe(
      (data) => {
        this.registros = data;
      },
      (error) => {
        console.error('Error al obtener los registros:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    // Crea el gráfico después de que se hayan inicializado los registros
    this.crearGrafica();
  }

  private crearGrafica(): void {
    const nombresMaterias = this.registros.map(registro => registro.materia);
    const notas = this.registros.map(registro => registro.notaActual);
  
    const ctx = document.getElementById('miGrafica') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: nombresMaterias,
        datasets: [
          {
            label: 'Notas Actuales',
            data: notas,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
