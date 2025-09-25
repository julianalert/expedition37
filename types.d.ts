type Post = {
  "id": number,
  "sticky": boolean,
  "title": string,
  "name": string,
  "image": string,
  "tag1": string,
  "tag2": string,
  "date": string,
}

type Destination = {
  "id": number,
  "rank": number,
  "city": string,
  "country": string,
  "image": string,
  "featured": boolean,
  "continent": string,
  "mood": string[],
}

type Country = {
  "id": number,
  "name": string,
  "image": string,
  "thumbnail": string,
  "featured": boolean,
  "continent": string,
  "mood": string[],
  "rank": number,
  "vacationgoal"?: string[],
  "safe"?: boolean,
  "fastInternet"?: boolean,
  "cleanAir"?: boolean,
  "hiddenGem"?: boolean,
  "popular"?: boolean,
  "familyFriendly"?: boolean,
  "amazingFood"?: boolean,
  "nightlife"?: boolean,
  "greatForDating"?: boolean,
  "ecofriendly"?: boolean,
  "dogfriendly"?: boolean,
  "lgbtqfriendly"?: boolean,
  "lowRacism"?: boolean,
  "muslimfriendly"?: boolean,
  "weeklyBudget"?: number,
  "overallRating"?: number,
  "costRating"?: number,
  "safetyRating"?: number,
  "funRating"?: number,
  "foodRating"?: number,
  "bestTimeToVisit"?: MonthlyRating[],
  "temperature"?: MonthlyTemperature[],
  "overview"?: OverviewData,
  "created_at"?: string,
  "updated_at"?: string,
}

type City = {
  "id": number,
  "name": string,
  "country": number,
  "image": string,
  "thumbnail": string,
  "featured": boolean,
  "rank"?: number,
  "mood": string[],
  "description"?: string,
  "overallRating"?: number,
  "costRating"?: number,
  "safetyRating"?: number,
  "funRating"?: number,
  "foodRating"?: number,
  "vacationgoal"?: string[],
  "safe"?: boolean,
  "fastInternet"?: boolean,
  "cleanAir"?: boolean,
  "hiddenGem"?: boolean,
  "popular"?: boolean,
  "familyFriendly"?: boolean,
  "amazingFood"?: boolean,
  "nightlife"?: boolean,
  "greatForDating"?: boolean,
  "ecofriendly"?: boolean,
  "dogfriendly"?: boolean,
  "lgbtqfriendly"?: boolean,
  "lowRacism"?: boolean,
  "muslimfriendly"?: boolean,
  "weeklyBudget"?: number,
  "bestTimeToVisit"?: MonthlyRating[],
  "temperature"?: MonthlyTemperature[],
  "overview"?: OverviewData,
  "thingstodo"?: ThingsToDoData,
  "created_at"?: string,
  "updated_at"?: string,
}

type MonthlyRating = {
  "month": string,
  "rating": "good" | "medium" | "bad"
}

type MonthlyTemperature = {
  "month": string,
  "avg_temp": number
}

type OverviewData = {
  "short_desc": string,
  "what_to_expect": WhatToExpectItem[],
  "top_experiences": TopExperienceItem[]
}

type WhatToExpectItem = {
  "title": string,
  "description": string
}

type TopExperienceItem = {
  "emoji": string,
  "name": string
}

type ThingsToDoData = {
  "categories": ThingsToDoCategory[]
}

type ThingsToDoCategory = {
  "key": string,
  "title": string,
  "intro": string,
  "emoji": string,
  "items": ThingsToDoItem[]
}

type ThingsToDoItem = {
  "name": string,
  "short_desc": string
}