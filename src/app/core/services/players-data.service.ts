import { Injectable } from '@angular/core';
import { getDefaultPlayer, Player, Sex } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersDataService {
  private players: Player[] = [];

  getAllPlayers() {
    return this.players;
  }

  addPlayer(player = getDefaultPlayer()) {
    this.players.push({
      ...player
    });
  }

}