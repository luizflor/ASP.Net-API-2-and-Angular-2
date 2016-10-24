import { Component, OnInit } from '@angular/core';

import { Hero } from './Hero';
import { HeroServicePromise } from './heroList.service.promise';

@Component({
    moduleId: module.id,
    selector: 'hero-list-promise',
    templateUrl: 'heroList.component.html',
    styleUrls: ['heroList.component.css'],
    providers: [HeroServicePromise]
})
export class HeroListComponentPromise implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;
    errorMessage: string = '';
    isLoading: boolean = true;
    title: string = 'My Heroes Promise';
    heroDetail: Hero;

    constructor(
        private heroService: HeroServicePromise) { }

    ngOnInit() {
        this.getAllHeroes();
    }

    getAllHeroes(): void {
        this.heroService
            .getAll()
            .then(
            heroes => this.heroes = heroes,
            error => this.errorMessage = <any>error
            );
    }

    onSelect(hero: Hero): void {
        this.heroDetail = null;
        this.selectedHero = hero;
    }

    add(name: string): void {
        this.selectedHero = null;
        name = name.trim();
        if (!name) { return; }
        let hero = this.heroes[this.heroes.length - 1];
        let id = hero.id;
        let newHero = new Hero();

        newHero.id = ++id;
        newHero.name = name;

        this.heroService
            .create(newHero)
            .then(
            hero => {
                this.heroes.push(newHero);
                this.selectedHero = null;
                this.isLoading = false
            },
                error => this.errorMessage = <any>error
            );
    }

    delete(hero: Hero): void {
        this.selectedHero = null;
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
                this.isLoading = false
            },
                error => this.errorMessage = <any>error
        );
    }

    gotoDetail(hero: Hero): void {
        this.heroService
            .get(hero.id)
            .then(
            hero => this.heroDetail = hero,
            error => this.errorMessage = <any>error
            );
    }
    save(): void {
        this.selectedHero = null;
        this.heroService
            .update(this.heroDetail)
            .then(() => {
                let h = this.heroes.find(x => x.id === this.heroDetail.id);
                h.name = this.heroDetail.name;
                this.heroDetail = null;
            },
                error => this.errorMessage = <any>error
        );
    }
}