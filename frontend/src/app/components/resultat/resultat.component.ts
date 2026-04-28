import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-resultat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultat.component.html'
})
export class ResultatComponent implements OnInit {
  famille_id!: number;
  resultat: any = null;
  historique: any[] = [];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.famille_id = +this.route.snapshot.paramMap.get('famille_id')!;
    this.chargerHistorique();
  }

  chargerHistorique() {
    this.api.getHistorique(this.famille_id).subscribe({
      next: (data) => {
        this.historique = data;
        this.resultat = data.length > 0 ? data[0] : null;
      },
      error: (err) => {
        console.error('[RESULTAT] Erreur chargement historique:', err);
      }
    });
  }

  retour() {
    this.router.navigate(['/familles']);
  }
}