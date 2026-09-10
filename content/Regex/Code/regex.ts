function emailValidation1() {
    const text = "Contactez-nous à support@example.com ou sales@example.org.";
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailRegex);
    console.log(emails); // ["support@example.com", "sales@example.org"]
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}



function caracBase() {
    const regex = /abc/; // Correspond exactement à "abc"

    const strings = [
        "abc",       // correspond
        "abcd",      // correspond (car "abc" est présent)
        "aabc",      // correspond (car "abc" est présent)
        "ab",        // ne correspond pas
        "xyz",       // ne correspond pas
    ];

    strings.forEach(str => {
        console.log(`"${str}" correspond à "abc" ? :`, regex.test(str));
    });
}

function metaCarac() {
    const regex = /\d{3}-\d{3}-\d{4}/;
    const result = "Numéro : 123-425-6789".match(regex);
    console.log(result); // ["123-425-6789"]
}

function classCarac() {
    const regex = /[aeiou]/g; // Correspond à toutes les voyelles

    const text = "Hello World!";
    const vowels = text.match(regex);
    console.log(vowels); // ["e", "o", "o"]

    const regex2 = /[a-z]/g;
    const result = "abc123".match(regex2);
    console.log(result); // ["a", "b", "c"]
}

function quantificateurs() {
    const regex = /\d{2,4}/g; // Correspond à 2 à 4 chiffres consécutifs

    const text = "Numéros : 12, 123, 1234, 12345";
    const matches = text.match(regex);
    console.log(matches); // ["12", "123", "1234"]
}

function groupes() {
    // Exemple avec des groupes capturants
    const regexCapturing = /(abc)+/; // Capture "abc" répété une ou plusieurs fois
    const regexNonCapturing = /(?:abc)+/; // Regroupe "abc" répété sans capturer

    // Chaînes de test
    const strings = [
        "abc",       // Correspond
        "abcabc",    // Correspond
        "abcabcabc", // Correspond
        "ab",        // Ne correspond pas
    ];

    // Tester les groupes capturants
    console.log("Groupes capturants :");
    strings.forEach(str => {
        const match = str.match(regexCapturing);
        console.log(`"${str}" :`, match ? match[0] : "Pas de correspondance");
        console.log(match);
    });
    
    // Tester les groupes non-capturants
    console.log("\nGroupes non-capturants :");
    strings.forEach(str => {
        const match = str.match(regexNonCapturing);
        console.log(`"${str}" :`, match ? match[0] : "Pas de correspondance");
        console.log(match);
    });
}

function extractGroupes() {
    const regex = /(\d{4})-(\d{2})-(\d{2})/; // Capture l'année, le mois et le jour
    const date = "2023-10-01";

    const match = date.match(regex);
    if (match) {
        console.log(match);
        console.log(`Année : ${match[1]}`); // 2023
        console.log(`Mois : ${match[2]}`);  // 10
        console.log(`Jour : ${match[3]}`);  // 01
    }
    console.log(match);
}

function groupeCapturant() {
    // Regex avec groupes capturants
    const regex = /(http|https):\/\/([a-zA-Z0-9.-]+)\.(com|org|net)/;

    // Chaînes de test
    const urls = [
        "http://example.com",   // Correspond
        "https://example.org",  // Correspond
        "ftp://example.net",    // Ne correspond pas (pas http/https)
        "http://example.xyz",   // Ne correspond pas (extension non valide)
    ];

    // Tester les URLs et afficher les groupes capturés
    urls.forEach(url => {
        const match = url.match(regex);
        if (match) {
            console.log(`"${url}" correspond. Protocole : ${match[1]}, Domaine : ${match[2]}, Extension : ${match[3]}`);
        } else {
            console.log(`"${url}" ne correspond pas.`);
        }
    });
}

function groupeNonCapturant() {
    // Regex avec groupes non-capturants
    const regex = /(?:http|https):\/\/[a-zA-Z0-9.-]+\.(?:com|org|net)/;

    // Chaînes de test
    const urls = [
        "http://example.com",   // Correspond
        "https://example.org",  // Correspond
        "ftp://example.net",    // Ne correspond pas (pas http/https)
        "http://example.xyz",   // Ne correspond pas (extension non valide)
    ];

    // Tester les URLs
    urls.forEach(url => {
        console.log(`"${url}" correspond ? :`, regex.test(url));
    });
    console.log(urls[0].match(regex));
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
}

function cleanExtraSpaces(input) {
    const spaceRegex = /\s+/g;
    return input.trim().replace(spaceRegex, ' ');
}

function searchReplace() {
    const text = "Bonjour, M. Dupont. Bonjour, Mme Durand.";
    const regex = /Bonjour/g;
    const result = text.replace(regex, "Salut");
    console.log(result); // "Salut, M. Dupont. Salut, Mme Durand."
}

function cleanPhoneNumber(phone) {
    const phoneRegex = /\D/g; // \D signifie "tout sauf un chiffre"
    return phone.replace(phoneRegex, '');
}

function extractEmails(text) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    return text.match(emailRegex) || [];
}

function extractLog() {
    const log = "2023-10-01 12:34:56 ERROR: Something went wrong";
    const regex = /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) (ERROR|INFO|WARN): (.+)/;
    const match = log.match(regex);
    console.log(match);
    // ["2023-10-01 12:34:56 ERROR: Something went wrong", "2023-10-01", "12:34:56", "ERROR", "Something went wrong"]
}

function exemples() {
    extractLog(); 
    /*
    caracBase();
    metaCarac();
    classCarac();
    emailValidation1();
    quantificateurs();
    groupes();
    extractGroupes();
    groupeCapturant();
    groupeNonCapturant();
    
    searchReplace();
    
    // Exemple d'utilisation
    const messyText = "   Ceci   est    un   texte   avec    trop d'espaces.   ";
    console.log(cleanExtraSpaces(messyText));  // "Ceci est un texte avec trop d'espaces."
    
    // Exemple d'utilisation de la fonction validateEmail
    const email = "test@example.com";
    console.log(validateEmail(email));  // true
    console.log(validateEmail("invalid-email"));  // false
    console.log(validatePhoneNumber("(123) 456-7890")); // true
    console.log(validatePhoneNumber("123-456-7890")); // false
    
    // Exemple d'utilisation
    const messyPhoneNumber = "(123) 456-7890";
    console.log(cleanPhoneNumber(messyPhoneNumber));  // "1234567890"

    // Exemple d'utilisation
    const textWithEmails = "Voici quelques emails : test@example.com, contact@domain.org, info@site.fr";
    console.log(extractEmails(textWithEmails));  // ["test@example.com", "contact@domain.org", "info@site.fr"]

    */
}

exemples(); 