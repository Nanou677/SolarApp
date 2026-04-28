import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-appareil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appareil.component.html'
})
export class AppareilComponent implements OnInit {
  appareils: any[] = [];
  famille_id!: number;
  form = { nom: '', puissance_w: 0, heures_nuit: 0 };
  message = '';
  calculEnCours = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.famille_id = +this.route.snapshot.paramMap.get('famille_id')!;
    this.charger();
  }

  charger() {
    this.api.getAppareils(this.famille_id).subscribe({
      next: (data) => {
        this.appareils = data;
      },
      error: (err) => {
        console.error('[APPAREIL] Erreur chargement:', err);
      }
    });
  }

  ajouter() {
    if (!this.form.nom || !this.form.puissance_w) {
      this.message = 'Nom et puissance sont obligatoires';
      return;
    }

    this.api.createAppareil({ ...this.form, famille_id: this.famille_id }).subscribe({
      next: () => {
        this.message = 'Appareil ajouté !';
        this.form = { nom: '', puissance_w: 0, heures_nuit: 0 };
        this.charger();
      },
      error: (err) => {
        console.error('[APPAREIL] Erreur ajout:', err);
        this.message = 'Erreur lors de l’ajout';
      }
    });
  }

  supprimer(id: number) {
    if (confirm('Supprimer cet appareil ?')) {
      this.api.deleteAppareil(id).subscribe({
        next: () => this.charger(),
        error: (err) => console.error('[APPAREIL] Erreur suppression:', err)
      });
    }
  }

  calculer() {
    if (this.calculEnCours) return;

    this.calculEnCours = true;
    this.message = 'Calcul en cours...';

    this.api.calculer(this.famille_id).subscribe({
      next: (res) => {
        console.log('[APPAREIL] Calcul réussi:', res);
        this.message = 'Calcul enregistré avec succès';
        this.calculEnCours = false;
      },
      error: (err) => {
        console.error('[APPAREIL] Erreur calcul:', err);
        this.message = err?.error?.erreur || 'Erreur lors du calcul';
        this.calculEnCours = false;
      }
    });
  }

  voirResultat() {
    this.router.navigate(['/resultat', this.famille_id]);
  }
}