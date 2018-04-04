import { Game } from './../games/game';
export class Favorite {
    _id: string;
    user_id: string;
    game_id: Game;
    comment: string;
    date_saved: Date;
}
