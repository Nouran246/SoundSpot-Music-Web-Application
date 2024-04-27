document.addEventListener("DOMContentLoaded", function() {
    var languageSelect = document.getElementById("language-select");

    var saveButton = document.getElementById("save-button");
    var cancelButton = document.getElementById("cancel-button");

    var settingsButton = document.getElementById("settings-button");

    var settingsPopupContainer = document.querySelector('.settings-popup-container');

    var initialLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageSelect.value = initialLanguage;

    settingsPopupContainer.style.display = 'none';

    saveButton.addEventListener("click", function() {
        var selectedLanguage = languageSelect.value;

        localStorage.setItem('selectedLanguage', selectedLanguage);

        alert("Are you sure you want to change the language to " + selectedLanguage);

        setLanguage(selectedLanguage);

        settingsPopupContainer.style.display = 'none';
    });

    cancelButton.addEventListener("click", function() {
        settingsPopupContainer.style.display = 'none';
    });

    settingsButton.addEventListener("click", function() {
        settingsPopupContainer.style.display = 'block';
    });

    setLanguage(initialLanguage);
});

var translations = {
    'en': {
        'manage_users': 'Manage Users',
        'manage_songs': 'Manage Songs',
        'reports': 'Reports',
        'plans': 'Plans',
        'company_overview': 'Company Overview',
        'community_guidelines': 'Community Guidelines',
        'contacts': 'Contacts',
        'settings': 'Settings',
        'change_language': 'Change Language',
        'save': 'Save',
        'cancel': 'Cancel',
        'footer_text': '&copy; 2024 SoundSpot. All rights reserved.',
        'facebook': 'Facebook',
        'instagram': 'Instagram',
        'email': 'Email',
        'search_placeholder': 'Search...',
        'profile': 'Profile',
        'view_as': 'View as',
        'light_mode': 'Light Mode',
        'log_out': 'Log Out',
        'playlist_name_label': 'Playlist Name:',
        'select_genre_placeholder': 'Select Genre',
        'album_name_label': 'Album Name:',
        'select_songs_button': 'Select Songs',
        'release_date_label': 'Release Date:',
        'keywords_label': 'Keywords:',
        'privacy_settings_label': 'Privacy Settings:',
        'public': 'Public',
        'private': 'Private',
        'hidden': 'Hidden',
        'create_playlist_title': 'Create a Playlist',
        'playlist_name_label': 'Playlist Name:',
        'song_name_label': 'Song Name:',
        'album_name_label': 'Album Name:',
        'release_date_label': 'Release Date:',
        'keywords_label': 'Keywords:',
        'privacy_settings_label': 'Privacy Settings:',
        'upload_song_label': 'Upload Song (MP3 / wav / ogg / aac / m4a):',
        'upload_image_label': 'Upload Image (JPEG, PNG):',
        'save_button': 'Save',
        'upload_song_label': 'Upload Song (MP3 / wav / ogg / aac / m4a):',
        'upload_image_label': 'Upload Image (JPEG, PNG):',
        'save_button': 'Save',
        'add_new_song_title': 'Add a New Song', // New translation for the title
        'artist_name_label': 'Artist Name',
        'add_lyrics_label': 'Add Lyrics', 
        'lyrics_label': 'Lyrics:', 
        'lyrics_placeholder': 'Enter lyrics',
        'playlist_name_placeholder': 'Enter playlist name',
        'select_artist_placeholder': 'Select Artist',
        'keywords_placeholder': 'Enter Keywords',
        'album_name_placeholder': 'Enter Album Name',
        'Other': 'Other',
        'Dance': 'Dance',
        'Electronic': 'Electronic',
        'Classical': 'Classical',
        'Alternative': 'Alternative',
        'Arab/Middle Eastern': 'Arab/Middle Eastern',
        'Contacts': 'Contacts',
        'Enter your contacts': 'Enter your contacts',
        'Save': 'Save',
        'Community Guidelines': 'Community Guidelines',
        'Enter your community guidelines': 'Enter your community guidelines',
        'Company Overview': 'Company Overview',
        'Enter your company overview': 'Enter your company overview',
        'users': 'Users',
    'songs': 'Songs',
    'manage_songs': 'Manage Songs',
    'manage_playlists': 'Manage Playlists',
    'manage_tracks': 'Manage Tracks',
    'manage_plans': 'Manage Plans',
        'free_subscription': 'Free Subscription',
        'premium_subscription': 'Premium Subscription',
        'free_subscription_details': 'Free Subscription details',
        'edit': 'Edit',
        'price': 'Price',
        'features': 'Features',
       
        
    },
    'gm': {
        // German translations
        'manage_users': 'Benutzer verwalten',
        'manage_songs': 'Lieder verwalten',
        'reports': 'Berichte',
        'plans': 'Pläne',
        'company_overview': 'Firmenüberblick',
        'community_guidelines': 'Community-Richtlinien',
        'contacts': 'Kontakte',
        'settings': 'Einstellungen',
        'change_language': 'Sprache ändern',
        'save': 'Speichern',
        'cancel': 'Abbrechen',
        'footer_text': '&copy; 2024 SoundSpot. Alle Rechte vorbehalten.',
        'facebook': 'Facebook',
        'instagram': 'Instagram',
        'email': 'E-Mail',
        'search_placeholder': 'Suchen...',
        'profile': 'Profil',
        'view_as': 'Als anzeigen',
        'light_mode': 'Hell-Modus',
        'log_out': 'Ausloggen',
        'playlist_name_label': 'Wiedergabelistenname:',
        'select_genre_placeholder': 'Genre auswählen',
        'album_name_label': 'Albumname:',
        'select_songs_button': 'Lieder auswählen',
        'release_date_label': 'Veröffentlichungsdatum:',
        'keywords_label': 'Stichwörter:',
        'privacy_settings_label': 'Datenschutzeinstellungen:',
        'public': 'Öffentlich',
        'private': 'Privat',
        'hidden': 'Versteckt',
        'create_playlist_title': 'Eine Playlist erstellen',
        'playlist_name_label': 'Wiedergabelistenname:',
        'album_name_label': 'Albumname:',
        'release_date_label': 'Veröffentlichungsdatum:',
        'keywords_label': 'Stichwörter:',
        'privacy_settings_label': 'Privatsphäre-Einstellungen:',
        'upload_song_label': 'Lied hochladen (MP3 / wav / ogg / aac / m4a):',
        'upload_image_label': 'Bild hochladen (JPEG, PNG):',
        'save_button': 'Speichern',
        'upload_song_label': 'Lied hochladen (MP3 / wav / ogg / aac / m4a):',
        'upload_image_label': 'Bild hochladen (JPEG, PNG):',
        'save_button': 'Speichern',
        'add_new_song_title': 'Neuen Song hinzufügen', 
        'artist_name_label': 'Künstlername',
        'add_lyrics_label': 'Songtext hinzufügen', 
        'lyrics_label': 'Songtext:', 
        'lyrics_placeholder': 'Songtext eingeben' 
       , 'playlist_name_placeholder': 'Geben Sie den Namen der Wiedergabeliste ein',
       'select_artist_placeholder': 'Künstler auswählen',
       'keywords_placeholder': 'Geben Sie Stichwörter ein',
       'album_name_placeholder': 'Albumnamen eingeben',
       'Dance': 'Tanz',
       'Electronic': 'Elektronisch',
       'Other': 'Andere',
       'Classical': 'Klassik',
       'Alternative': 'Alternative',
       'Arab/Middle Eastern': 'Arabisch/Mittlerer Osten',
       'Contacts': 'Kontakte',
       'Enter your contacts': 'Geben Sie Ihre Kontakte ein',
       'Save': 'Speichern',
       'Community Guidelines': 'Community-Richtlinien',
       'Enter your community guidelines': 'Geben Sie Ihre Community-Richtlinien ein',
       'Company Overview': 'Firmenüberblick',
       'Enter your company overview': 'Geben Sie Ihren Firmenüberblick ein',
       'users': 'Benutzer',
    'songs': 'Lieder',
    'manage_songs': 'Lieder verwalten',
    'manage_playlists': 'Wiedergabelisten verwalten',
    'manage_tracks': 'Tracks verwalten',
    'manage_plans': 'Pläne verwalten',
    'free_subscription': 'Kostenloses Abonnement',
    'premium_subscription': 'Premium-Abonnement',
    'free_subscription_details': 'Details zum kostenlosen Abonnement',
    'edit': 'Bearbeiten',
    'price': 'Preis',
    'features': 'Eigenschaften',
    'save_button_2': 'Speichern',
        'premium_subscription_details': 'Details zum Premium-Abonnement',
        'students_subscription_details': 'Details zum Studentenabonnement',
        'family_plan_details': 'Details zum Familienplan',
        'individual_plan_details': 'Details zum individuellen Plan',
        'etisalat_offer_details': 'Details zum Etisalat-Angebot',
        'vodafone_offer_details': 'Details zum Vodafone-Angebot',
        'orange_offer_details': 'Details zum Orange-Angebot',
        'edit_button': 'Bearbeiten',
        'song_name_label_german': 'Liedtitel'
    }
};

function setLanguage(language) {
    var translation = translations[language];


    var sidebarLinks = document.querySelectorAll('.text-a.t');
    sidebarLinks.forEach(function(link) {
        var key = link.textContent.trim().toLowerCase().replace(/\s+/g, '_');
        if (translation[key]) {
            link.textContent = translation[key];
        }
    });

    var genreOptions = document.querySelectorAll('#genre option');

genreOptions.forEach(function(option) {
    var optionValue = option.getAttribute('value');
    if (optionValue && translation[optionValue]) {
        option.textContent = translation[optionValue];
    }
});

// Update text content for the Users box
var usersBox = document.querySelector('.box:nth-of-type(1) .text');
if (usersBox && translation['users']) {
    usersBox.textContent = translation['users'];
}
var saveButtonElement = document.getElementById('save-button');
if (saveButtonElement && translation['save']) {
    saveButtonElement.textContent = translation['save'];
}

var detailsElement = document.getElementById('details');
if (detailsElement && translation['free_subscription_details']) {
    detailsElement.textContent = translation['free_subscription_details'];
}

var editButtonElement = document.querySelector('.edit-button');
if (editButtonElement && translation['edit']) {
    editButtonElement.textContent = translation['edit'];
}

var titleElement = document.querySelector('.title7');
if (titleElement && translation['manage_plans']) {
    titleElement.textContent = translation['manage_plans'];
}


var titleElement = document.querySelector('.text2');
if (titleElement && translation['premium_subscription']) {
    titleElement.textContent = translation['premium_subscription'];
}

var titleElement = document.querySelector('.text1');
if (titleElement && translation['free_subscription']) {
    titleElement.textContent = translation['free_subscription'];
}
var titleElement = document.querySelector('.title9');
if (titleElement && translation['premium_subscription']) {
    titleElement.textContent = translation['premium_subscription'];
}

var titleElement = document.querySelector('.title8');
if (titleElement && translation['free_subscription']) {
    titleElement.textContent = translation['free_subscription'];
}
// Update text content for the Songs box
var songsBox = document.querySelector('.box:nth-of-type(2) .text');
if (songsBox && translation['songs']) {
    songsBox.textContent = translation['songs'];
}

// Update text content for the Reports box
var reportsBox = document.querySelector('.box:nth-of-type(3) .text');
if (reportsBox && translation['reports']) {
    reportsBox.textContent = translation['reports'];
}

// Update text content for the Plans box
var plansBox = document.querySelector('.box:nth-of-type(4) .text');
if (plansBox && translation['plans']) {
    plansBox.textContent = translation['plans'];
}

// Update text content for the Overview box
var overviewBox = document.querySelector('.box:nth-of-type(5) .text');
if (overviewBox && translation['overview']) {
    overviewBox.textContent = translation['overview'];
}

// Update text content for the Contacts box
var contactsBox = document.querySelector('.box:nth-of-type(6) .text');
if (contactsBox && translation['contacts']) {
    contactsBox.textContent = translation['contacts'];
}



var titleElement = document.querySelector('.title');
if (titleElement && translation['manage_tracks']) {
    titleElement.textContent = translation['manage_tracks'];
}

// Update text content for the "Manage Songs" box
var manageSongsBox = document.querySelector('.title + .main-content .box-container .text');
if (manageSongsBox && translation['manage_songs']) {
    manageSongsBox.textContent = translation['manage_songs'];
}

// Update text content for the "Manage Playlists" box
var managePlaylistsBox = document.querySelector('.title + .main-content .box-container:nth-of-type(2) .text');
if (managePlaylistsBox && translation['manage_playlists']) {
    managePlaylistsBox.textContent = translation['manage_playlists'];
}


// Family Plan Details Title
var familyPlanTitleElement = document.querySelector('.plan:nth-of-type(2) #details');
if (familyPlanTitleElement && translation['family_plan_details']) {
    familyPlanTitleElement.textContent = translation['family_plan_details'];
}

// Premium Subscription Details Title
var premiumSubscriptionTitleElement = document.querySelector('.plan:nth-of-type(3) #details');
if (premiumSubscriptionTitleElement && translation['premium_subscription_details']) {
    premiumSubscriptionTitleElement.textContent = translation['premium_subscription_details'];
}

// Students Subscription Details Title
var studentsSubscriptionTitleElement = document.querySelector('.plan:nth-of-type(4) #details');
if (studentsSubscriptionTitleElement && translation['students_subscription_details']) {
    studentsSubscriptionTitleElement.textContent = translation['students_subscription_details'];
}

// Individual Plan Details Title
var individualPlanTitleElement = document.querySelector('.plan:nth-of-type(5) #details');
if (individualPlanTitleElement && translation['individual_plan_details']) {
    individualPlanTitleElement.textContent = translation['individual_plan_details'];
}

// Etisalat Offer Details Title
var etisalatOfferTitleElement = document.querySelector('.plan:nth-of-type(6) #details');
if (etisalatOfferTitleElement && translation['etisalat_offer_details']) {
    etisalatOfferTitleElement.textContent = translation['etisalat_offer_details'];
}

// Vodafone Offer Details Title
var vodafoneOfferTitleElement = document.querySelector('.plan:nth-of-type(7) #details');
if (vodafoneOfferTitleElement && translation['vodafone_offer_details']) {
    vodafoneOfferTitleElement.textContent = translation['vodafone_offer_details'];
}

// Orange Offer Details Title
var orangeOfferTitleElement = document.querySelector('.plan:nth-of-type(8) #details');
if (orangeOfferTitleElement && translation['orange_offer_details']) {
    orangeOfferTitleElement.textContent = translation['orange_offer_details'];
}


var premiumSubscriptionTitleElement = document.querySelector('.title10');
if (premiumSubscriptionTitleElement && translation['premium_subscription_details']) {
    premiumSubscriptionTitleElement.textContent = translation['premium_subscription_details'];
}


// Premium Subscription Edit Button
var premiumEditButton = document.querySelector('.edit-container button[onclick="editPlan(\'premium\')"]');
if (premiumEditButton && translation['edit']) {
    premiumEditButton.textContent = translation['edit'];
}

// Family Plan Edit Button
var familyEditButton = document.querySelector('.edit-container button[onclick="editPlan(\'family\')"]');
if (familyEditButton && translation['edit']) {
    familyEditButton.textContent = translation['edit'];
}

// Individual Plan Edit Button
var individualEditButton = document.querySelector('.edit-container button[onclick="editPlan(\'individual\')"]');
if (individualEditButton && translation['edit']) {
    individualEditButton.textContent = translation['edit'];
}

// Etisalat Offer Edit Button
var etisalatEditButton = document.querySelector('.edit-container button[onclick="editPlan(\'etisalat\')"]');
if (etisalatEditButton && translation['edit']) {
    etisalatEditButton.textContent = translation['edit'];
}

// Vodafone Offer Edit Button
var vodafoneEditButton = document.querySelector('.edit-container button[onclick="editPlan(\'vodafone\')"]');
if (vodafoneEditButton && translation['edit']) {
    vodafoneEditButton.textContent = translation['edit'];
}


// Orange Offer Edit Button
var orangeEditButton = document.querySelector('.edit-container button[onclick="editPlan(\'orange\')"]');
if (orangeEditButton && translation['edit']) {
    orangeEditButton.textContent = translation['edit'];
}

var studentsSubscriptionDetails = document.getElementById("students-subscription-details");
if (studentsSubscriptionDetails && translation['students_subscriptio']) {
    studentsSubscriptionDetails.textContent = translation['students_subscriptio'];
}

var manageUsersIcon = document.querySelector('.text-a:nth-child(3) .fas.fa-users');
if (manageUsersIcon && translation['manage_users']) {
    manageUsersIcon.nextElementSibling.textContent = translation['manage_users'];
}

var songNameInput = document.getElementById('song-name');
if (songNameInput && translation['playlist_name_placeholder']) {
    songNameInput.placeholder = translation['playlist_name_placeholder'];
}

var artistNameSelect = document.getElementById('artist-name');
var translation = translations[language];

// Check if the artistNameSelect exists and the translation for the placeholder is available
if (artistNameSelect && translation['select_artist_placeholder']) {
    // Set the translated placeholder text
    artistNameSelect.querySelector('option').textContent = translation['select_artist_placeholder'];
}

var addLyricsLabel = document.querySelector('label[for="lyrics-checkbox"]');
if (addLyricsLabel && translation['add_lyrics_label']) {
    addLyricsLabel.textContent = translation['add_lyrics_label'];
}

var keywordsInput = document.getElementById('keywords');
var translation = translations[language];

// Check if the keywordsInput exists and the translation for the placeholder is available
if (keywordsInput && translation['keywords_placeholder']) {
    // Set the translated placeholder text
    keywordsInput.placeholder = translation['keywords_placeholder'];
}

var lyricsLabel = document.querySelector('label[for="lyrics"]');
if (lyricsLabel && translation['lyrics_label']) {
    lyricsLabel.textContent = translation['lyrics_label'];
}

var lyricsTextarea = document.getElementById('lyrics');
if (lyricsTextarea && translation['lyrics_placeholder']) {
    lyricsTextarea.placeholder = translation['lyrics_placeholder'];
}


var albumNameInput = document.getElementById('album-name');
if (albumNameInput && translation['album_name_placeholder']) {
    albumNameInput.placeholder = translation['album_name_placeholder'];
}




var contactsTitle = document.querySelector('.title3');
if (contactsTitle && translation['Contacts']) {
    contactsTitle.textContent = translation['Contacts'];
}

var contactsTextarea = document.getElementById('resizable-textarea-5');
if (contactsTextarea && translation['Enter your contacts']) {
    contactsTextarea.placeholder = translation['Enter your contacts'];
}

var saveButton5 = document.getElementById('save-button-5');
if (saveButton5 && translation['Save']) {
    saveButton5.textContent = translation['Save'];
}

var communityGuidelinesTitle = document.querySelector('.title4');
if (communityGuidelinesTitle && translation['Community Guidelines']) {
    communityGuidelinesTitle.textContent = translation['Community Guidelines'];
}

var communityGuidelinesTextarea = document.getElementById('resizable-textarea-4');
if (communityGuidelinesTextarea && translation['Enter your community guidelines']) {
    communityGuidelinesTextarea.placeholder = translation['Enter your community guidelines'];
}

var saveButton4 = document.getElementById('save-button-4');
if (saveButton4 && translation['Save']) {
    saveButton4.textContent = translation['Save'];
}

var companyOverviewTextarea = document.getElementById('resizable-textarea-3');
var saveButtonCompanyOverview = document.getElementById('save-button-3');

if (companyOverviewTextarea && translation['company_overview_placeholder']) {
    companyOverviewTextarea.placeholder = translation['company_overview_placeholder'];
}

if (saveButtonCompanyOverview && translation['save']) {
    saveButtonCompanyOverview.textContent = translation['save'];
}

var companyOverviewTitle = document.querySelector('.title5');

if (companyOverviewTitle && translation['company_overview']) {
    companyOverviewTitle.textContent = translation['company_overview'];
}
var saveButton = document.getElementById('save-button');
var uploadSongLabel = document.querySelector('label[for="song-file"]');
var uploadImageLabel = document.querySelector('label[for="image-file"]');
var artistNameLabel = document.querySelector('label[for="artist-name"]');

if (saveButton && translation['save_button']) {
    saveButton.textContent = translation['save_button'];
}

if (uploadSongLabel && translation['upload_song_label']) {
    uploadSongLabel.textContent = translation['upload_song_label'];
}

if (uploadImageLabel && translation['upload_image_label']) {
    uploadImageLabel.textContent = translation['upload_image_label'];
}

if (artistNameLabel && translation['artist_name_label']) {
    artistNameLabel.textContent = translation['artist_name_label'];
}
var manageSongsIcon = document.querySelector('.text-a:nth-child(4) .fa-solid.fa-music');
if (manageSongsIcon && translation['manage_songs']) {
    manageSongsIcon.nextElementSibling.textContent = translation['manage_songs'];
}

var reportsIcon = document.querySelector('.text-a:nth-child(5) .fa-solid.fa-chart-column');
if (reportsIcon && translation['reports']) {
    reportsIcon.nextElementSibling.textContent = translation['reports'];
}

var plansIcon = document.querySelector('.text-a:nth-child(6) .fa-solid.fa-wallet');
if (plansIcon && translation['plans']) {
    plansIcon.nextElementSibling.textContent = translation['plans'];
}

var companyOverviewIcon = document.querySelector('.text-a:nth-child(7) .fa-regular.fa-newspaper');
if (companyOverviewIcon && translation['company_overview']) {
    companyOverviewIcon.nextElementSibling.textContent = translation['company_overview'];
}

var communityGuidelinesIcon = document.querySelector('.text-a:nth-child(8) .fa-solid.fa-file-signature');
if (communityGuidelinesIcon && translation['community_guidelines']) {
    communityGuidelinesIcon.nextElementSibling.textContent = translation['community_guidelines'];
}

var contactsIcon = document.querySelector('.text-a:nth-child(9) .fas.fa-phone');
if (contactsIcon && translation['contacts']) {
    contactsIcon.nextElementSibling.textContent = translation['contacts'];
}

    var searchBar = document.querySelector('.search-bar input[type="text"]');
    if (translation['search_placeholder']) {
        searchBar.placeholder = translation['search_placeholder'];
    }

    var profileLink = document.querySelector('#profile a');
    if (translation['profile']) {
        profileLink.textContent = translation['profile'];
    }

    var viewAsLink = document.querySelector('.menu-item:nth-child(2) a');
    if (translation['view_as']) {
        viewAsLink.textContent = translation['view_as'];
    }
    var settingsIcon = document.querySelector('.menu-item:nth-child(3) .fa-solid.fa-gear');
if (settingsIcon && translation['settings']) {
    settingsIcon.nextElementSibling.textContent = translation['settings'];
}
    var lightModeLink = document.querySelector('.menu-item:nth-child(4) a');
    if (translation['light_mode']) {
        lightModeLink.textContent = translation['light_mode'];
    }

    var logOutLink = document.querySelector('.menu-item:nth-child(5) a');
    if (translation['log_out']) {
        logOutLink.textContent = translation['log_out'];
    }

    var labelElement = document.querySelector('label[for="language-select"]');
    var saveButton = document.getElementById('save-button');
    var cancelButton = document.getElementById('cancel-button');
    var settingsPopupTitle = document.querySelector('.settings-popup h3');
    if (translation['change_language']) {
        labelElement.textContent = translation['change_language'];
    }
    if (translation['save']) {
        saveButton.textContent = translation['save'];
    }
    if (translation['cancel']) {
        cancelButton.textContent = translation['cancel'];
    }
    if (translation['settings']) {
    settingsPopupTitle.textContent = translation['settings'];
}

    var footerText = document.querySelector('footer .text-center p');
    var socialIcons = document.querySelectorAll('.social-icons a');
    if (translation['footer_text']) {
        footerText.textContent = translation['footer_text'];
    }
    var createPlaylistTitle = document.querySelector('.title1');
if (createPlaylistTitle && translation['create_playlist_title']) {
    createPlaylistTitle.textContent = translation['create_playlist_title'];
}
var addNewSongTitle = document.querySelector('.title2');
if (addNewSongTitle && translation['add_new_song_title']) {
    addNewSongTitle.textContent = translation['add_new_song_title'];
}

// Define the elements and their corresponding translations
var playlistNameLabel = document.querySelector('label[for="song-name"]');
var albumNameLabel = document.querySelector('label[for="album-name"]');
var releaseDateLabel = document.querySelector('label[for="release-date"]');
var keywordsLabel = document.querySelector('label[for="keywords"]');
var privacySettingsLabel = document.querySelector('label[for="privacy-settings"]');
var uploadSongLabel = document.querySelector('label[for="song-file"]');
var uploadImageLabel = document.querySelector('label[for="image-file"]');
var saveButton = document.getElementById('save-button');

// Check if the elements and their translations exist, then update the text content
if (playlistNameLabel && translation['playlist_name_label']) {
    playlistNameLabel.textContent = translation['playlist_name_label'];
}
var songNameLabel = document.querySelector('label[for="song-names"]');

if (songNameLabel && translation['song_name_label_german']) {
    songNameLabel.textContent = translation['song_name_label_german'];

}

if (albumNameLabel && translation['album_name_label']) {
    albumNameLabel.textContent = translation['album_name_label'];
}
if (releaseDateLabel && translation['release_date_label']) {
    releaseDateLabel.textContent = translation['release_date_label'];
}
if (keywordsLabel && translation['keywords_label']) {
    keywordsLabel.textContent = translation['keywords_label'];
}
if (privacySettingsLabel && translation['privacy_settings_label']) {
    privacySettingsLabel.textContent = translation['privacy_settings_label'];
}
if (uploadSongLabel && translation['upload_song_label']) {
    uploadSongLabel.textContent = translation['upload_song_label'];
}
if (uploadImageLabel && translation['upload_image_label']) {
    uploadImageLabel.textContent = translation['upload_image_label'];
}
if (saveButton && translation['save_button']) {
    saveButton.textContent = translation['save_button'];
}


  var albumNameLabel = document.querySelector('label[for="album-name"]');
if (albumNameLabel && translation['album_name_label']) {
    albumNameLabel.textContent = translation['album_name_label'];
}
var playlistNameLabel = document.querySelector('label[for="song-name"]');
if (playlistNameLabel && translation['playlist_name_label']) {
    playlistNameLabel.textContent = translation['playlist_name_label'];
}
    
    var selectGenrePlaceholder = document.getElementById('genre').getElementsByTagName('option')[0];
    if (selectGenrePlaceholder && translation['select_genre_placeholder']) {
        selectGenrePlaceholder.textContent = translation['select_genre_placeholder'];
    }
    
    var albumNameLabel = document.getElementById('album-name-label');
    if (albumNameLabel && translation['album_name_label']) {
        albumNameLabel.textContent = translation['album_name_label'];
    }
    
    var selectSongsButton = document.querySelector('.dropbtn');
    if (selectSongsButton && translation['select_songs_button']) {
        selectSongsButton.textContent = translation['select_songs_button'];
    }
    
    var releaseDateLabel = document.querySelector('label[for="release-date"]');
    if (releaseDateLabel && translation['release_date_label']) {
        releaseDateLabel.textContent = translation['release_date_label'];
    }
    
  
var keywordsLabel = document.querySelector('label[for="keywords"]');
if (keywordsLabel && translation['keywords_label']) {
    keywordsLabel.textContent = translation['keywords_label'];
}
var privacySettingsLabel = document.querySelector('label[for="privacy-settings"]');
if (privacySettingsLabel && translation['privacy_settings_label']) {
    privacySettingsLabel.textContent = translation['privacy_settings_label'];
}


var privacySettingsOptions = document.querySelectorAll('#privacy-settings option');
privacySettingsOptions.forEach(function(option) {
    var optionValue = option.getAttribute('value');
    if (optionValue && translation[optionValue]) {
        option.textContent = translation[optionValue];
    }
});
 
}

