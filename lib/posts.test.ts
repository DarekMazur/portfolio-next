import { describe, it, expect } from 'vitest';
import { createSlug } from './posts';

describe('Logika bloga', () => {
	describe('createSlug', () => {
		it('poprawnie zamienia tytuł na slug', () => {
			expect(createSlug('Aby życie było ciut prostsze')).toBe('aby-zycie-bylo-ciut-prostsze');
		});

		it('poprawnie obsługuje polskie znaki diakrytyczne', () => {
			expect(createSlug('Łódź żąda ąki')).toBe('lodz-zada-aki');
		});

		it('usuwa znaki specjalne i nadmiarowe spacje', () => {
			expect(createSlug('Prawda, czy nie prawda? - oto jest pytanie!')).toBe('prawda-czy-nie-prawda-oto-jest-pytanie');
		});

		it('zwraca "untitled-post" dla pustych tytułów', () => {
			expect(createSlug('')).toBe('untitled-post');
		});
	});
});