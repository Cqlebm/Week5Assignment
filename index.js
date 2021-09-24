class Song {
    constructor(title, artist){
        this.title = title;
        this.artist = artist;
    }

    describe(){
        return `${this.title} is by ${this.artist}.`;
    }
}

class Playlist {
    constructor(name){
        this.name = name;
        this.songs = [];
    }

    addSong(song){
        if (song instanceof Song){
            this.songs.push(song);
        } else{
            throw new Error(`You can only add an insance of a song. Argument is not a song ${song}.`);
        }
    }

    describe(){
        return `${this.name} has ${this.songs.length} songs.`;
    }
}

class Menu {
    constructor(){
        this.playlists = [];
        this.selectedPlaylist = null;
    }

    start(){
        let selection = this.showMainMenuOptions();

        while (selection != 0){
            switch (selection) {
            case '1':
                this.createPlaylist();
                break;
            case '2':
                this.viewPlaylist();
                break;
            case '3':
                this.deletePlaylist();
                break;
            case '4':
                this.displayPlaylists();
                break;
            default:
                selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions(){
        return prompt(`
        0) exit
        1) create new playlist
        2) view playlist
        3) delete playlist
        4) display all playlists
        `)
    }

    showPlaylistMenuOptions(playlistInfo){
        return prompt(`
        0) back
        1) add song
        2) delete song
        - - - - - - - - - -
        ${playlistInfo}
        `)
    }

    displayPlaylists(){
        let playlistString = '';
        for (let i = 0; i < this.playlists.length; i++){
            playlistString += i + ') ' + this.playlists[i].name + '\n';
        }
        alert(playlistString);
    }

    createPlaylist(){
        let name = prompt('Enter name for new playlist:');
        this.playlists.push(new Playlist(name));
    }

    viewPlaylist(){
        let index = prompt('Enter the index of the playlist you want to view:');
        if (index > -1 && index < this.playlists.length){
            this.selectedPlaylist = this.playlists[index];
            let description = 'Playlist name: ' + this.selectedPlaylist.name + '\n';

            for (let i = 0; i < this.selectedPlaylist.songs.length; i++){
                description += i + ') ' + this.selectedPlaylist.songs[i].name + ' - ' + this.selectedPlaylist[i].position + '\n';
            }

            let selection = this.showPlaylistMenuOptions(description);
            switch (selection){
                case '1':
                    this.addSong();
                    break;
                case '2':
                    this.deleteSong();
            }
        }
    }

    deletePlaylist(){
        let index = prompt('Enter the index of the playlist you want to delete:');
        if (index > - 1 && index < this.playlists.length){
            this.playlists.splice(index, 1);
        }
    }

    addSong(){
        let title = prompt('Enter title of new song:');
        let artist = prompt('Enter artist of new song:');
        this.selectedPlaylist.songs.push(new Song(title, artist));
    }

    deleteSong(){
        let index = prompt('Enter the index of the song you want to delete:');
        if (index > -1 && index < this.selectedPlaylist.songs.length){
            this.selectedPlaylist.songs.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();