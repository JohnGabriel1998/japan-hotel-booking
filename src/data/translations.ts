export const translations = {
  en: {
    // Header
    appName: "Japan Travelling Agency",
    hotels: "Hotels",
    favorites: "Favorites", 
    bookings: "Bookings",
    
    // Home page
    heroTitle: "Discover Premium Hotels in Japan",
    heroSubtitle: "Experience authentic Japanese hospitality at carefully curated luxury accommodations",
    searchPlaceholder: "Select destination",
    checkIn: "Check In",
    checkOut: "Check Out", 
    guests: "Guests",
    searchButton: "Search Hotels",
    featuredHotels: "Featured Hotels",
    hotelsFound: "hotels found",
    hotelFound: "hotel found",
    noHotelsTitle: "No hotels found",
    noHotelsSubtitle: "Try adjusting your search criteria or explore different destinations.",
    
    // Hotel card
    perNight: "per night",
    viewDetails: "View Details",
    
    // Common
    cancel: "Cancel",
    confirm: "Confirm",
    book: "Book",
    reviews: "Reviews",
    amenities: "Amenities",
    rooms: "Rooms",
    location: "Destination",
    
    // Filters
    priceRange: "Price Range",
    facilities: "Facilities",
    
    // Room types
    standardRoom: "Standard Room",
    deluxeRoom: "Deluxe Room", 
    suite: "Suite",
    traditionalRoom: "Traditional Room",
    
    // Languages
    language: "Language",
    english: "English",
    japanese: "日本語",
    
    // Favorites page
    noFavoritesTitle: "No Favorites Yet",
    noFavoritesSubtitle: "Start exploring hotels and add them to your favorites to see them here.",
    yourFavoriteHotels: "Your Favorite Hotels",
    hotelsSaved: "hotels saved",
    hotelSaved: "hotel saved",
    
    // Bookings page
    yourBookings: "Your Bookings",
    noBookingsTitle: "No Bookings Yet",
    noBookingsSubtitle: "Your confirmed hotel reservations will appear here.",
    bookingConfirmed: "Booking Confirmed",
    totalPaid: "Total Paid",
    bookingsFound: "bookings found",
    bookingFound: "booking found"
  },
  ja: {
    // Header
    appName: "日本旅行代理店",
    hotels: "ホテル",
    favorites: "お気に入り",
    bookings: "予約",
    
    // Home page  
    heroTitle: "日本のプレミアムホテルを発見",
    heroSubtitle: "厳選された高級宿泊施設で本格的な日本のおもてなしを体験",
    searchPlaceholder: "目的地を選択",
    checkIn: "チェックイン",
    checkOut: "チェックアウト",
    guests: "ゲスト",
    searchButton: "ホテルを検索",
    featuredHotels: "おすすめホテル",
    hotelsFound: "件のホテルが見つかりました",
    hotelFound: "件のホテルが見つかりました", 
    noHotelsTitle: "ホテルが見つかりません",
    noHotelsSubtitle: "検索条件を調整するか、他の目的地をお試しください。",
    
    // Hotel card
    perNight: "一泊あたり",
    viewDetails: "詳細を見る",
    
    // Common
    cancel: "キャンセル",
    confirm: "確認",
    book: "予約",
    reviews: "レビュー",
    amenities: "設備",
    rooms: "客室",
    location: "目的地",
    
    // Filters
    priceRange: "価格帯",
    facilities: "設備",
    
    // Room types
    standardRoom: "スタンダードルーム",
    deluxeRoom: "デラックスルーム",
    suite: "スイート",
    traditionalRoom: "和室",
    
    // Languages
    language: "言語",
    english: "English", 
    japanese: "日本語",
    
    // Favorites page
    noFavoritesTitle: "まだお気に入りがありません",
    noFavoritesSubtitle: "ホテルを探してお気に入りに追加すると、ここに表示されます。",
    yourFavoriteHotels: "お気に入りのホテル",
    hotelsSaved: "件のホテルを保存",
    hotelSaved: "件のホテルを保存",
    
    // Bookings page
    yourBookings: "ご予約",
    noBookingsTitle: "まだ予約がありません",
    noBookingsSubtitle: "確認されたホテルの予約がここに表示されます。",
    bookingConfirmed: "予約確認済み",
    totalPaid: "お支払い総額",
    bookingsFound: "件の予約が見つかりました",
    bookingFound: "件の予約が見つかりました"
  }
};

export type Language = 'en' | 'ja';
export type TranslationKey = keyof typeof translations.en;