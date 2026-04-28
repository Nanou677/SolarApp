import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-famille',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './famille.component.html'
})
export class FamilleComponent implements OnInit {
  familles: any[] = [];
  form = { nom: '', adresse: '', telephone: '' };
  message = '';
  loading = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.charger();
  }

  charger() {
    console.log('[FAMILLE] Chargement depuis la base...');
    this.loading = true;

    this.api.getFamilles().subscribe({
      next: (data) => {
        console.log('[FAMILLE] Donnees recues depuis l’API:', data);
        this.familles = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('[FAMILLE] Erreur chargement:', err);
        this.message = 'Erreur de chargement des familles';
        this.loading = false;
      }
    });
  }

  ajouter() {
    console.log('[FAMILLE] Ajout demande avec:', this.form);

    if (!this.form.nom || this.form.nom.trim() === '') {
      this.message = 'Le nom est obligatoire';
      return;
    }

    this.api.createFamille(this.form).subscribe({
      next: (res) => {
        console.log('[FAMILLE] Reponse POST createFamille:', res);
        this.message = 'Famille ajoutee !';
        this.form = { nom: '', adresse: '', telephone: '' };
        this.charger();
      },
      error: (err) => {
        console.error('[FAMILLE] Erreur insertion:', err);
        this.message = 'Erreur lors de l’ajout';
      }
    });
  }

  supprimer(id: number) {
    console.log('[FAMILLE] Suppression demande pour id:', id);

    if (confirm('Supprimer cette famille ?')) {
      this.api.deleteFamille(id).subscribe({
        next: (res) => {
          console.log('[FAMILLE] Suppression OK:', res);
          this.charger();
        },
        error: (err) => {
          console.error('[FAMILLE] Erreur suppression:', err);
          this.message = 'Erreur lors de la suppression';
        }
      });
    }
  }

  aller(id: number) {
    console.log('[FAMILLE] Navigation vers appareils de famille:', id);
    this.router.navigate(['/appareils', id]);
  }
}