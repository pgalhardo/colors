const languages = [
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Português' },
]

/**
 * Checks if a given language code exists in the languages list.
 *
 * @param code - The language code to check (e.g., 'en' or 'pt').
 * @returns Returns true if the language exists, false otherwise.
 */
function languageExists(code: string): boolean {
  return languages.some((language) => language.code === code)
}

export { languages, languageExists }
