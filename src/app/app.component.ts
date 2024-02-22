import { Component  } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  // se!:string;
  // movies:any=[];
   // search(){
  //   fetch(`https://www.omdbapi.com/?s=${this.se}&apikey=ce5830c8`)
  //   .then((res)=>res.json())
  //   .then((data)=>this.movies=data.Search);
  // }
  se!: string;
  searchPerformed: boolean = false; // Variable to track whether search is performed
  searchTriggered: boolean = false; // Variable to track whether search is triggered
  movies: any[] = [];
  isDarkMode: boolean = false;
  upcomingMovies: any[] = []; // Add this line
  trendingMovies:any[]=[];
  showOverview: boolean[] = [];
  searchedQuery!:string;
    ngOnInit() {
    // Load upcoming movies when the component initializes
    this.loadUpcomingMovies();
    this.loadTrendingMovies();
  }
  
 
  search() {
    if (this.se.trim() !== '') { // Check if search input is not empty
      // Perform search
      this.searchPerformed = true;
      this.searchTriggered = true; // Search is triggered
    const url = `https://api.themoviedb.org/3/search/movie?query=${this.se}&include_adult=true&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTEzZDMyMmJjYzkwNDcwOGNiNWI2MzM3NzJhMjhlMCIsInN1YiI6IjY1ZDUyYzhkNWNhNzA0MDBjOTBjNzg0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7EpOKgKN5n53SlaO74yg8C1KXmTKGwdSNTTndZcZjxw'
      }
    };
  
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        this.movies = data.results;
      });

  }
  else {
    // Reset variables if search input is empty
    this.searchPerformed = false;
    this.searchTriggered = true; // Search is triggered
    this.movies = [];
  }
}

  loadUpcomingMovies() {
    const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTEzZDMyMmJjYzkwNDcwOGNiNWI2MzM3NzJhMjhlMCIsInN1YiI6IjY1ZDUyYzhkNWNhNzA0MDBjOTBjNzg0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7EpOKgKN5n53SlaO74yg8C1KXmTKGwdSNTTndZcZjxw'
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        this.upcomingMovies = data.results;
      });
    }
      loadTrendingMovies() {
        const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTEzZDMyMmJjYzkwNDcwOGNiNWI2MzM3NzJhMjhlMCIsInN1YiI6IjY1ZDUyYzhkNWNhNzA0MDBjOTBjNzg0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7EpOKgKN5n53SlaO74yg8C1KXmTKGwdSNTTndZcZjxw'
  }
};

fetch(url, options)
.then(res => res.json())
.then(data => {
  this.trendingMovies = data.results;
});

}

get upcomingMoviesChunks() {
  const chunkSize = 4;
  const chunks = [];
  for (let i = 0; i < this.upcomingMovies.length; i += chunkSize) {
    chunks.push(this.upcomingMovies.slice(i, i + chunkSize));
  }
  return chunks;
}
get trendingMoviesChunks() {
    const chunkSize = 4;
    const chunks = [];
    for (let i = 0; i < this.trendingMovies.length; i += chunkSize) {
      chunks.push(this.trendingMovies.slice(i, i + chunkSize));
    }
    return chunks;
  }

  
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }
}

