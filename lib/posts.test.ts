import { describe, it, expect } from 'vitest';
import { createSlug } from './posts';

describe('Blog logic', () => {
	describe('createSlug', () => {
		it('correctly converts the title to a slug', () => {
			expect(createSlug('Aby życie było ciut prostsze')).toBe('aby-zycie-bylo-ciut-prostsze');
		});

		it('correctly handles Polish diacritical marks', () => {
			expect(createSlug('Łódź żąda ąki')).toBe('lodz-zada-aki');
		});

		it('removes special characters and extra spaces', () => {
			expect(createSlug('Prawda, czy nie prawda? - oto jest pytanie!')).toBe('prawda-czy-nie-prawda-oto-jest-pytanie');
		});

		it('returns “untitled-post” for empty titles', () => {
			expect(createSlug('')).toBe('untitled-post');
		});
	});
});