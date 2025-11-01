import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PlayersDataService } from '../core/services/players-data.service';
import { getDefaultPlayer, Player, Sex } from '../core/models/player.model';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { KeyValuePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-players-list',
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatTableModule,
    KeyValuePipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersList implements OnInit {
  private playersDataService = inject(PlayersDataService);
  protected readonly Sex = Sex;
  protected readonly MAX_LEVEL = 10;


  //TODO: refactor all to models and use service to keep players in localStorage

  // players = signal<Player[]>([]);

  // addPlayer(): void {
  //   this.players.update((players) => {
  //     players.push(getDefaultPlayer());
  //     return players;
  //   });
  // }

  players: Player[] = [];

  displayedColumns: string[] = ['name', 'level', 'inventoryStrength', 'totalStrength', 'actions'];
  dataSource = this.players;

  editForm: FormGroup;
  isEditing = false;
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      sex: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.updateDataSource();
  }

  increaseLevel(player: Player, index: number): void {
    player.level++;
    this.updatePlayer(index, player);
  }

  decreaseLevel(player: Player, index: number): void {
    if (player.level > 1) {
      player.level--;
      this.updatePlayer(index, player);
    }
  }

  increaseInventory(player: Player, index: number): void {
    player.inventoryStrength += 1;
    this.updatePlayer(index, player);
  }

  decreaseInventory(player: Player, index: number): void {
    if (player.inventoryStrength >= 1) {
      player.inventoryStrength -= 1;
      this.updatePlayer(index, player);
    }
  }

  startEdit(player: Player, index: number): void {
    this.isEditing = true;
    this.editingIndex = index;
    this.editForm.patchValue({
      name: player.name,
      sex: player.sex
    });
  }

  saveEdit(): void {
    if (this.editForm.valid && this.editingIndex !== null) {
      const updatedPlayer = {
        ...this.players[this.editingIndex],
        ...this.editForm.value
      };

      this.updatePlayer(this.editingIndex, updatedPlayer);
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingIndex = null;
    this.editForm.reset();
  }

  addNewPlayer(): void {
    const newPlayer: Player = {
      name: 'New Player',
      sex: Sex.Agender,
      level: 1,
      inventoryStrength: 0,
    };

    this.players.push(newPlayer);
    this.updateDataSource();
    this.startEdit(newPlayer, this.players.length - 1);
  }

  openFightCalculator(): void {
    //TODO: TBD
  }

  deletePlayer(index: number): void {
    if (confirm('Are you sure you want to delete this player?')) {
      this.players.splice(index, 1);
      this.updateDataSource();
      if (this.editingIndex === index) {
        this.cancelEdit();
      }
    }
  }

  private updatePlayer(index: number, player: Player): void {
    this.players[index] = { ...player };
    this.updateDataSource();
  }

  private updateDataSource(): void {
    this.dataSource = [...this.players];
  }
}
