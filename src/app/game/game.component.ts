import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      const card = this.game.stack.pop();
      if (card) {
        this.currentCard = card;
        console.log(this.currentCard);
        this.pickCardAnimation = true;

        console.log('New Card: ' + this.currentCard);
        console.log('Game ', this.game);

        setTimeout(() => {
          this.game.playedCards.push(this.currentCard);
          this.pickCardAnimation = false;
        }, 1000);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
