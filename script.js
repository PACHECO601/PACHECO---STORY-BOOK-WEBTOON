const searchStories = [
    { id: 1, title: "Solo Max-Level Newbie", cover: "solomax.jpg", genre: "Action, Fantasy" },
    { id: 2, title: "Eleceed", cover: "eleceed.jpeg", genre: "Action, Adventure" },
    { id: 3, title: "Sword Master's Youngest Son", cover: "swordmaster.jpeg", genre: "Action, Fantasy" },
    { id: 4, title: "Pick Me Up! Infinite Gacha", cover: "pick me up.jpg", genre: "Action, Fantasy" },
    { id: 5, title: "The Extra's Academy Survival Guide", cover: "extra.jpeg", genre: "Fantasy, School" },
    { id: 6, title: "Infinite Mage", cover: "infinite.jpg", genre: "Fantasy" },
    { id: 7, title: "Star Embracing Sword Master", cover: "star.jpeg", genre: "Action, Fantasy" },
    { id: 8, title: "Wind Breaker", cover: "windbreaker.jpg", genre: "Sports, Drama" },
    { id: 9, title: "Solo Leveling", cover: "solo level.jpg", genre: "Action, Fantasy" },
    { id: 10, title: "Villain to Kill", cover: "Villain.jpg", genre: "Action, Supernatural" },
    { id: 11, title: "Absolute Sword Sense", cover: "absolute.jpeg", genre: "Action, Fantasy" },
    { id: 12, title: "SSS-Class Revival Hunter", cover: "SSS CLASS.jpeg", genre: "Action, Fantasy" },
    { id: 13, title: "Lookism", cover: "Lookism_Volume_1_Cover.jpg", genre: "Action, Drama" },
    { id: 14, title: "The Regressed Mercenary's Machinations", cover: "regressed.jpeg", genre: "Action, Fantasy" },
    { id: 15, title: "Absolute Regression", cover: "regression.jpg", genre: "Action, Fantasy" },
    { id: 16, title: "The Greatest Estate Developer", cover: "Greatest.jpg", genre: "Comedy, Fantasy" },
    { id: 17, title: "Nano Machine", cover: "Nano.jpg", genre: "Action, Martial Arts" },
    { id: 18, title: "I Am the Fated Villain", cover: "I am.jpeg", genre: "Action, Fantasy" },
    { id: 19, title: "Myst, Myth, Mayhem", cover: "myst.png", genre: "Action, Fantasy" },
    { id: 20, title: "Childhood Friend of the Zenith", cover: "child.jpeg", genre: "Fantasy" },
    { id: 21, title: "Omniscient Reader's Viewpoint", cover: "omni.jpeg", genre: "Action, Fantasy" },
    { id: 22, title: "The Beginning After the End", cover: "beginning.jpg", genre: "Adventure, Romance, Fantasy" },
    { id: 23, title: "Tower of God", cover: "Tower of God.jpg", genre: "Adventure, Fantasy" },
    { id: 24, title: "Doom Breaker", cover: "doom.jpg", genre: "Action, Fantasy" },
    { id: 25, title: "The God of High School", cover: "god.jpg", genre: "Action, Supernatural" },
    { id: 26, title: "Wistoria", cover: "wistoria.jpg", genre: "Action, Fantasy" },
    { id: 27, title: "Bleach", cover: "Bleach.jpg", genre: "Action, Supernatural" },
    { id: 28, title: "Black Clover", cover: "black.jpg", genre: "Action, Fantasy" },
    { id: 29, title: "Attack on Titan", cover: "attack.jpg", genre: "Action, Dark Fantasy" },
    { id: 30, title: "Jujutsu Kaisen", cover: "JJK.jpeg", genre: "Action, Supernatural" }
];


const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const searchSuggestions = document.querySelector("#searchSuggestions");

if (searchForm && searchInput && searchSuggestions) {
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.trim().toLowerCase();

        searchSuggestions.innerHTML = "";

        if (!query) {
            searchSuggestions.classList.remove("show");
            return;
        }

        const matches = searchStories
            .filter(story => story.title.toLowerCase().includes(query))
            .slice(0, 6);

        if (matches.length === 0) {
            searchSuggestions.innerHTML = `
                <div class="search-no-results">No stories found.</div>
            `;
        } else {
            searchSuggestions.innerHTML = matches.map(story => `
                <a class="search-suggestion"
                   href="reader.html?id=${story.id}">          
                <img src="images/${story.cover}" alt="${story.title}">

                    <div class="search-suggestion-info">
                        <h4>${story.title}</h4>
                        <p>${story.genre}</p>
                    </div>
                </a>
            `).join("");
        }

        searchSuggestions.classList.add("show");
    });

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const query = searchInput.value.trim();

        if (query) {
            window.location.href =
                "browse.html?search=" + encodeURIComponent(query);
        }
    });

    document.addEventListener("click", function (event) {
        if (!searchForm.contains(event.target)) {
            searchSuggestions.classList.remove("show");
        }
    });

    searchInput.addEventListener("focus", function () {
        if (searchInput.value.trim()) {
            searchInput.dispatchEvent(new Event("input"));
        }
    });
}

const browseSearch = document.querySelector("#browseSearch");
const genreFilter = document.querySelector("#genreFilter");
const statusFilter = document.querySelector("#statusFilter");
const sortStories = document.querySelector("#sortStories");
const browseGrid = document.querySelector("#browseGrid");
const resultCount = document.querySelector("#resultCount");
const noResults = document.querySelector("#noResults");
const resultsHeading = document.querySelector(".browse-results-heading h2");

if (
    browseSearch &&
    genreFilter &&
    statusFilter &&
    sortStories &&
    browseGrid &&
    resultCount &&
    noResults
) {
    const allStories = Array.from(
        browseGrid.querySelectorAll(".comic-card")
    );

    const params = new URLSearchParams(window.location.search);
    const urlSearch = params.get("search");
    const urlGenre = params.get("genre");

    if (urlSearch) {
        browseSearch.value = urlSearch;
    }

    if (urlGenre) {
        let option = Array.from(genreFilter.options).find(
            item => item.value.toLowerCase() === urlGenre.toLowerCase()
        );

        if (!option) {
            option = document.createElement("option");
            option.value = urlGenre.toLowerCase();
            option.textContent = urlGenre
                .replace(/-/g, " ")
                .replace(/\b\w/g, char => char.toUpperCase());

            genreFilter.appendChild(option);
        }

        genreFilter.value = option.value;
    }

    function updateBrowsePage() {
        const searchText = browseSearch.value.trim().toLowerCase();
        const selectedGenre = genreFilter.value.toLowerCase();
        const selectedStatus = statusFilter.value.toLowerCase();
        const selectedSort = sortStories.value;

        const filteredStories = allStories.filter(card => {
            const title = (
                (card.dataset.title || "") + " " +
                (card.querySelector("h3")?.textContent || "")
            ).toLowerCase();

            const genres = (card.dataset.genre || "")
                .toLowerCase()
                .split(/[\s,]+/)
                .filter(Boolean);

            const status = (card.dataset.status || "").toLowerCase();

            const matchesSearch = title.includes(searchText);
            const matchesGenre =
                selectedGenre === "all" || genres.includes(selectedGenre);
            const matchesStatus =
                selectedStatus === "all" || status === selectedStatus;

            return matchesSearch && matchesGenre && matchesStatus;
        });

        if (selectedSort === "az") {
            filteredStories.sort((a, b) =>
                a.querySelector("h3").textContent.localeCompare(
                    b.querySelector("h3").textContent
                )
            );
        } else if (selectedSort === "za") {
            filteredStories.sort((a, b) =>
                b.querySelector("h3").textContent.localeCompare(
                    a.querySelector("h3").textContent
                )
            );
        }

        allStories.forEach(card => {
            card.hidden = true;
        });

        filteredStories.forEach(card => {
            card.hidden = false;
            browseGrid.appendChild(card);
        });

        resultCount.textContent =
            `${filteredStories.length} ${
                filteredStories.length === 1 ? "story" : "stories"
            }`;

        noResults.hidden = filteredStories.length > 0;

        if (resultsHeading) {
            resultsHeading.textContent =
                selectedGenre === "all"
                    ? "All Stories"
                    : `${selectedGenre.replace(/\b\w/g, char =>
                        char.toUpperCase()
                    )} Stories`;
        }
    }

    browseSearch.addEventListener("input", updateBrowsePage);
    genreFilter.addEventListener("change", updateBrowsePage);
    statusFilter.addEventListener("change", updateBrowsePage);
    sortStories.addEventListener("change", updateBrowsePage);

    updateBrowsePage();
}


const themeToggle = document.getElementById("themeToggle");

function updateThemeButton() {
    if (!themeToggle) return;

    const isLight = document.body.classList.contains("light-mode");

    themeToggle.textContent = isLight ? "🌤️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );
}

if (themeToggle) {
    updateThemeButton();

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const isLight = document.body.classList.contains("light-mode");

        localStorage.setItem("mangaTheme", isLight ? "light" : "dark");

        updateThemeButton();
    });
}



const popularTabs = document.querySelectorAll(".popular-tab");
const popularList = document.querySelector("#popularList");

const popularData = {
    weekly: [9, 2, 3, 4, 5],
    monthly: [16, 21, 17, 8, 23],
    "all-time": [29, 28, 30, 27, 25]
};

const popularRatings = {
    9: "9.6", 2: "9.5", 3: "9.4", 4: "9.3", 5: "9.2",
    16: "9.5", 21: "9.4", 17: "9.3", 8: "9.2", 23: "9.1",
    29: "9.8", 28: "9.6", 30: "9.5", 27: "9.4", 25: "9.2"
};

function renderPopularStories(period) {
    if (!popularList || !popularData[period]) return;

    popularList.innerHTML = popularData[period].map((id, index) => {
        const comic = searchStories.find(story => story.id === id);

        if (!comic) return "";

        return `
            <article class="popular-item">
                <span class="rank">${index + 1}</span>

                <a href="reader.html?id=${comic.id}" class="popular-cover">        
                <img src="images/${comic.cover}" alt="${comic.title}">

                </a>

                <div class="popular-info">
                    <h3>
                        <a href="reader.html?id=${comic.id}">
                            ${comic.title}
                        </a>
                    </h3>
                    <p>${comic.genre}</p>
                    <span class="stars">★★★★★</span>
                    <span class="popular-rating">
                        ${popularRatings[comic.id] || "9.0"}
                    </span>
                </div>
            </article>
        `;
    }).join("");
}

if (popularTabs.length && popularList) {
    popularTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            popularTabs.forEach(item => item.classList.remove("active"));
            tab.classList.add("active");
            renderPopularStories(tab.dataset.period);
        });
    });

    renderPopularStories(
        document.querySelector(".popular-tab.active")?.dataset.period
        || "weekly"
    );
}


const storyChapters = {
    1: {
        title: "Solo Max-Level Newbie",
        chapters: [{
            number: 1,
            title: "The Final Stage",
            paragraphs: [
                "The tower had become a place where only the most determined dared to continue. Every floor introduced new rules, hidden dangers, and opponents who seemed impossible to overcome. A lone challenger stood before the next entrance, reviewing everything learned from previous trials. There was no guarantee of success, but turning back would mean abandoning the goal that had brought him this far.",
                "As the gate opened, the atmosphere changed. Strange symbols appeared across the walls, revealing clues that most challengers would overlook. Rather than rushing forward, he studied the pattern and considered what the tower expected from anyone who entered. The first obstacle was not a powerful enemy, but a decision: trust instinct, or take the time to understand the rules."
                
            ]
        }]
    },

    2: {
        title: "Eleceed",
        chapters: [{
            number: 1,
            title: "An Unexpected Encounter",
            paragraphs: [
                "An ordinary day took an unusual turn when a young man encountered someone whose abilities seemed impossible to explain. What began as a confusing meeting slowly became an opportunity to learn about a hidden world operating beyond everyday life. Questions came faster than answers, and every new discovery made the world feel larger than before.",
                "The stranger was not eager to explain everything. Instead, he watched closely, testing the young man's patience and judgment. Their conversation revealed that unusual abilities carried responsibilities as well as advantages. By the end of the encounter, the young man realized that his life might never return to the quiet routine he once knew."
            ]
        }]
    },

    3: {
        title: "Sword Master's Youngest Son",
        chapters: [{
            number: 1,
            title: "A New Beginning",
            paragraphs: [
                "The great family was known for its swordsmanship, discipline, and long history of rivalry. Within its walls, even the youngest members were expected to prove their worth. One young heir had spent years trying to understand where he belonged, surrounded by expectations that often seemed impossible to satisfy.",
                "A new opportunity allowed him to reconsider his future. Instead of relying entirely on the family's reputation, he began focusing on his own training and decisions. The path ahead would demand patience, courage, and a willingness to challenge old assumptions. For the first time, he began to see a future shaped by his own choices."
            ]
        }]
    },

    4: {
        title: "Pick Me Up! Infinite Gacha",
        chapters: [{
            number: 1,
            title: "The First Mission",
            paragraphs: [
                "The mission appeared simple on paper, but the team quickly discovered that the environment was full of unexpected complications. Resources were limited, information was incomplete, and every member had a different idea about the best way forward. The leader knew that one careless decision could put the entire group at risk.",
                "Instead of charging ahead, the team paused to study the surroundings. They divided responsibilities, compared what each person had noticed, and prepared for more than one possible outcome. When the first threat finally appeared, their preparation gave them a chance to respond together rather than panic individually."
            ]
        }]
    },

    5: {
        title: "The Extra's Academy Survival Guide",
        chapters: [{
            number: 1,
            title: "A Quiet Start",
            paragraphs: [
                "The academy was filled with talented students, ambitious families, and unwritten rules that newcomers had to learn quickly. The protagonist wanted to avoid unnecessary attention and focus on building a stable future. Unfortunately, even a carefully planned routine could be disrupted by a single unexpected event.",
                "A classroom encounter introduced a complication that could not simply be ignored. The protagonist considered the possible consequences before choosing a response. It became clear that surviving academy life required more than academic knowledge; understanding people, managing expectations, and knowing when to act would matter just as much."
            ]
        }]
    },

    6: {
        title: "Infinite Mage",
        chapters: [{
            number: 1,
            title: "The First Spark",
            paragraphs: [
                "Magic was often treated as a gift reserved for people born into the right families. Yet a curious student believed that careful study and persistence could reveal principles hidden beneath the impressive displays of power. With limited resources, he began experimenting with the fundamentals and recording every result.",
                "His first success was small, but it proved that patient observation could accomplish what guesswork could not. The discovery brought new questions about the nature of magic and the limits imposed by society. Rather than being discouraged, he continued learning, determined to discover how far knowledge could take him."
            ]
        }]
    },

    7: {
        title: "Star Embracing Sword Master",
        chapters: [{
            number: 1,
            title: "Under the Night Sky",
            paragraphs: [
                "A young swordsman looked toward the distant stars and wondered how someone with an ordinary beginning could earn a place among the great warriors. Training had taught him the value of discipline, but the world beyond his home was full of dangers he had never faced.",
                "When a difficult task arrived, he accepted it despite his doubts. The journey tested his endurance and forced him to reconsider what strength truly meant. Each step offered another lesson, and the young swordsman began to understand that becoming a master would require more than skill with a blade."
            ]
        }]
    },

    8: {
        title: "Wind Breaker",
        chapters: [{
            number: 1,
            title: "The Open Road",
            paragraphs: [
                "The city streets became a different world when the riders gathered. For some, cycling was a way to escape pressure; for others, it was a chance to prove their ability. One rider approached every route with focus, paying attention to the smallest details that could make the difference between a smooth ride and a difficult race.",
                "A new challenge brought unfamiliar competitors and unexpected tension. The rider had to decide whether winning mattered more than understanding the people sharing the road. As the race began, speed alone was not enough. Awareness, timing, and trust in the team became just as important."
            ]
        }]
    },

    9: {
        title: "Solo Leveling",
        chapters: [{
            number: 1,
            title: "A Hunter's Choice",
            paragraphs: [
                "In a world where mysterious gates connected ordinary places to dangerous dungeons, hunters risked their lives to protect others and earn a living. A low-ranked hunter accepted difficult work because the people depending on him needed support. Although he knew his limitations, he continued entering dangerous places rather than abandoning his responsibilities.",
                "During an expedition, the group discovered a chamber unlike anything described in their usual reports. The strange surroundings suggested that the danger was far greater than expected. Everyone had to reconsider their next move, and the hunter realized that surviving would depend on careful observation and cooperation rather than courage alone."
            ]
        }]
    },

    10: {
        title: "Villain to Kill",
        chapters: [{
            number: 1,
            title: "The Other Side of Power",
            paragraphs: [
                "Powerful individuals were divided by public labels that rarely explained the whole truth. Some were celebrated as heroes, while others were feared as villains. A man caught between these judgments began questioning whether reputation was a reliable measure of someone's character.",
                "An unexpected confrontation forced him to consider the consequences of his abilities. He could choose the easiest path and accept how others described him, or take responsibility for his own decisions. The choice would not erase the past, but it could determine the kind of person he became."
            ]
        }]
    },

    11: {
        title: "Absolute Sword Sense",
        chapters: [{
            number: 1,
            title: "A Voice in the Blade",
            paragraphs: [
                "A young martial artist had spent years searching for a way to improve in a world ruled by skill and reputation. His progress had been slow, and the techniques that worked for others seemed difficult for him to master. Then an unusual experience changed how he understood the weapons around him.",
                "The discovery offered a new way to study swordsmanship, but it also raised questions about its limits. He began practicing carefully, comparing what he learned with established techniques. Every answer revealed another challenge, and he understood that a strange advantage would only matter if he learned to use it responsibly."
            ]
        }]
    },

    12: {
        title: "SSS-Class Revival Hunter",
        chapters: [{
            number: 1,
            title: "Another Opportunity",
            paragraphs: [
                "In a world where hunters competed for recognition, one overlooked individual struggled to find a reason to keep improving. Watching others succeed made his own limitations feel impossible to ignore. Yet a rare opportunity appeared, one that could change his future if he understood its conditions.",
                "The new ability came with questions that could not be answered immediately. He began considering not only how it might help him, but also what it would mean for the people around him. The chance to begin again offered hope, but it also demanded a level of responsibility he had never faced before."
            ]
        }]
    },

    13: {
        title: "Lookism",
        chapters: [{
            number: 1,
            title: "A Different Perspective",
            paragraphs: [
                "At school, appearances influenced friendships, attention, and the way people judged one another. A student who had grown used to being overlooked found himself facing a situation that challenged his assumptions about popularity and respect. The experience made him question how much of a person's identity was decided by other people's opinions.",
                "As he navigated new relationships, he began noticing that confidence could hide insecurity and that popularity did not guarantee happiness. Every interaction offered another perspective on the pressures students faced. He gradually learned that understanding people required looking beyond first impressions."
            ]
        }]
    },

    14: {
        title: "The Regressed Mercenary's Machinations",
        chapters: [{
            number: 1,
            title: "A Second Chance",
            paragraphs: [
                "A veteran who had spent years navigating conflict suddenly found himself facing the possibility of a different future. Experience had taught him that battles were rarely decided by strength alone; preparation, timing, and knowledge of the people involved could be just as important.",
                "With a new opportunity before him, he began planning carefully. Old mistakes became lessons rather than burdens, and familiar rivalries appeared in a different light. He knew that changing the outcome would require patience, because every action could influence events beyond his immediate control."
            ]
        }]
    },

    15: {
        title: "Absolute Regression",
        chapters: [{
            number: 1,
            title: "The Price of Returning",
            paragraphs: [
                "The chance to revisit the past seemed like an answer to years of regret. Yet memories alone could not guarantee a better outcome. The protagonist had to decide which events to change, which people to trust, and whether a different choice might create an entirely new problem.",
                "Careful preparation became essential. Each familiar face carried new uncertainty because the future was no longer fixed. The protagonist moved forward with a clearer purpose, understanding that a second chance was valuable only if it led to wiser decisions."
            ]
        }]
    },

    16: {
        title: "The Greatest Estate Developer",
        chapters: [{
            number: 1,
            title: "A Plan for Prosperity",
            paragraphs: [
                "A struggling estate faced problems that could not be solved by grand promises alone. Roads were poor, resources were wasted, and residents had little reason to believe that their situation would improve. A practical-minded newcomer began examining the estate as a collection of problems that could be measured and addressed.",
                "The first proposal sounded unusual, but its details offered a realistic path toward improvement. The newcomer worked to convince skeptical residents and officials that careful planning could create lasting benefits. The project would take time, yet the possibility of a better future gave everyone a reason to listen."
            ]
        }]
    },

    17: {
        title: "Nano Machine",
        chapters: [{
            number: 1,
            title: "An Unusual Inheritance",
            paragraphs: [
                "In a world shaped by martial traditions and political rivalry, a young man faced obstacles that seemed designed to keep him powerless. His position offered little protection, and every decision had to be weighed against the intentions of those around him.",
                "An unexpected development gave him access to a new way of understanding his abilities. He began testing its limits carefully, aware that an advantage could become a weakness if used without judgment. His immediate goal was survival, but his growing knowledge suggested a much larger future."
            ]
        }]
    },

    18: {
        title: "I Am the Fated Villain",
        chapters: [{
            number: 1,
            title: "A Role to Question",
            paragraphs: [
                "A world full of powerful families and extraordinary talents often seemed to follow a script written long before its people were born. One calculating figure recognized that appearances could conceal the real motives behind every alliance. Rather than accepting the role others expected, he began studying the people and rules around him.",
                "Each encounter became a test of observation and strategy. A small shift in one relationship could change the balance of an entire conflict, so he chose his words and actions carefully. The future remained uncertain, but he was determined not to let other people's expectations decide every outcome."
            ]
        }]
    },

    19: {
        title: "Myst, Myth, Mayhem",
        chapters: [{
            number: 1,
            title: "A Strange Road",
            paragraphs: [
                "The journey began with an event that made ordinary explanations seem inadequate. Rumors of strange powers and forgotten traditions spread among people who disagreed about what was real. The protagonist followed the clues, hoping to separate truth from stories that had grown more dramatic with every retelling.",
                "A remote encounter revealed that some mysteries were dangerous precisely because people misunderstood them. Instead of assuming that every strange event had a simple answer, the protagonist learned to observe carefully and question convenient explanations. The path ahead promised discovery, but not without risk."
            ]
        }]
    },

    20: {
        title: "Childhood Friend of the Zenith",
        chapters: [{
            number: 1,
            title: "A Promise Revisited",
            paragraphs: [
                "A familiar relationship can change when time, ambition, and unexpected circumstances pull people in different directions. Two people who once understood one another easily found themselves facing new responsibilities and questions about the future.",
                "A conversation brought old memories back into focus, but it also revealed how much both had changed. Their shared history offered a foundation for trust, yet they would have to make new choices rather than rely only on the promises of the past."
            ]
        }]
    },

    21: {
        title: "Omniscient Reader's Viewpoint",
        chapters: [{
            number: 1,
            title: "The Last Page",
            paragraphs: [
                "After following a long-running story for years, one reader reached its final chapter and expected the familiar sense of closure. Instead, the world around him began changing in ways that echoed the fiction he knew. The rules he had once read about now affected real people, each forced to make decisions under pressure.",
                "His knowledge offered a possible advantage, but the unfolding events quickly proved that knowing a story was not the same as controlling it. Every choice changed the situation, creating consequences that no page had prepared him for. He had to decide whether to follow the story he remembered or protect the people standing beside him."
            ]
        }]
    },

    22: {
        title: "The Beginning After the End",
        chapters: [{
            number: 1,
            title: "A Life Rewritten",
            paragraphs: [
                "A new life offered possibilities that had once seemed out of reach. The protagonist entered an unfamiliar world with memories and expectations shaped by a very different past. Learning its customs, relationships, and systems required patience, even with the benefit of previous experience.",
                "As new abilities began to develop, the protagonist realized that a different beginning did not erase every difficulty. Family, friendship, and personal responsibility created challenges that could not be solved through knowledge alone. The future remained open, and every decision helped shape the person he would become."
            ]
        }]
    },

    23: {
        title: "Tower of God",
        chapters: [{
            number: 1,
            title: "The Climb Begins",
            paragraphs: [
                "A mysterious tower promised extraordinary opportunities to those willing to face its trials. Every floor held different rules, unfamiliar people, and challenges that tested more than physical strength. A newcomer entered with a personal reason to climb, uncertain of what the journey would demand.",
                "The first test revealed that progress depended on understanding others as much as overcoming obstacles. Alliances formed quickly, but trust remained difficult to measure. As the newcomer moved forward, the tower began to feel less like a simple challenge and more like a world with its own secrets and competing ambitions."
            ]
        }]
    },

    24: {
        title: "Doom Breaker",
        chapters: [{
            number: 1,
            title: "A Future Reclaimed",
            paragraphs: [
                "After witnessing the consequences of failure, a determined warrior faced the possibility of changing the course of events. Memories of past struggles offered valuable warnings, but they could not guarantee that the future would unfold in the same way.",
                "The warrior began preparing with greater care, choosing allies and opportunities according to lessons learned through hardship. Every improvement brought hope, while every unexpected difference served as a reminder that the future could not be controlled completely. The next attempt would require courage and flexibility in equal measure."
            ]
        }]
    },

    25: {
        title: "The God of High School",
        chapters: [{
            number: 1,
            title: "The Tournament's Call",
            paragraphs: [
                "A martial arts tournament brought together competitors with different styles, motivations, and ideas about what strength meant. Some entered for recognition, others for personal reasons, and a few seemed interested in goals they refused to explain.",
                "The early matches revealed more than technical skill. Rivalries emerged, friendships began unexpectedly, and unusual abilities hinted that the competition might be connected to something larger. The participants continued forward, unaware of how much the tournament would change their lives."
            ]
        }]
    },

    26: {
        title: "Wistoria",
        chapters: [{
            number: 1,
            title: "A Place Among Mages",
            paragraphs: [
                "In a society where magic shaped status and opportunity, a student without the expected talent struggled to prove that he belonged. Others measured worth by familiar standards, leaving little room for abilities that did not fit the usual pattern.",
                "Rather than surrendering to those judgments, the student continued developing the skills he did possess. Every challenge demanded extra effort, but each small success challenged the assumption that only one kind of talent could lead to greatness. His goal remained difficult, yet he refused to let others define its limits."
            ]
        }]
    },

    27: {
        title: "Bleach",
        chapters: [{
            number: 1,
            title: "A Promise Without Magic",
            paragraphs: [
                "A seemingly ordinary encounter revealed that the visible world was only one part of a much larger reality. Strange events began appearing around familiar places, and the protagonist found himself caught between everyday responsibilities and dangers few people could recognize.",
                "A new responsibility arrived before there was enough time to understand it fully. With guidance from an experienced ally, the protagonist began learning the rules of this hidden world. Each discovery raised new questions about duty, courage, and the people who depended on him."
            ]
        }]
    },

    28: {
        title: "Black Clover",
        chapters: [{
            number: 1,
            title: "A Promise Without Magic",   
            paragraphs: [
                "In a kingdom where magic influenced nearly every part of life, a determined young person faced the challenge of being judged by a standard that seemed impossible to meet. Others doubted that ambition could overcome such a disadvantage, but the protagonist refused to abandon a long-held goal.",
                "A difficult test brought both disappointment and a new understanding of personal strength. The protagonist began to recognize that persistence, teamwork, and creativity could open paths that others overlooked. The dream remained far away, yet the resolve to pursue it grew stronger."
            ]
        }]
    },

    29: {
        title: "Attack on Titan",
        chapters: [{
            number: 1,
            title: "Beyond the Walls",
            paragraphs: [
                "Life behind enormous walls had taught people to value routine and fear the unknown. Stories about the world outside were passed from one generation to the next, but few had the chance to learn what was true. A young person longed to understand what lay beyond the boundaries that shaped everyday life.",
                "An unexpected crisis challenged the belief that the walls guaranteed safety. Fear spread through the community, and familiar routines gave way to urgent decisions. The experience forced the protagonist to confront difficult questions about freedom, survival, and the price of learning the truth."
            ]
        }]
    },

    30: {
        title: "Jujutsu Kaisen",
        chapters: [{
            number: 1,
            title: "The Weight of Curses",
            paragraphs: [
                "Strange dangers existed just beyond the awareness of ordinary people, born from emotions that few knew how to control. When an unexpected incident brought the protagonist into contact with this hidden world, an ordinary routine became a difficult responsibility.",
                "Learning about curses revealed that power alone could not solve every problem. The protagonist had to understand the risks, listen to experienced allies, and consider the consequences of every decision. The road ahead was uncertain, but the need to protect others gave the journey a clear purpose."
            ]
        }]
    }
};


const readerTitleElement = document.getElementById("readerTitle");

if (readerTitleElement) {
    const params = new URLSearchParams(window.location.search);

    const storyId =
        params.get("id") ||
        params.get("storyId") ||
        params.get("comicId") ||
        params.get("story_id");

    const titleFromUrl =
        params.get("title") ||
        params.get("story") ||
        params.get("name") ||
        params.get("comic");

    const chapterFromUrl = parseInt(params.get("chapter"), 10) || 1;

    const chapterTitleElement = document.getElementById("chapterTitle");
    const novelChapterHeading = document.getElementById("novelChapterHeading");
    const chapterSelect = document.getElementById("chapterSelect");
    const readerContent = document.getElementById("readerContent");
    const chapterList = document.getElementById("chapterList");

    const prevButtons = [
        document.getElementById("prevChapter"),
        document.getElementById("prevChapterBottom")
    ].filter(Boolean);

    const nextButtons = [
        document.getElementById("nextChapter"),
        document.getElementById("nextChapterBottom")
    ].filter(Boolean);

    
    let story = null;

    if (storyId) {
        story = searchStories.find(
            item => String(item.id) === String(storyId)
        );
    }

    
    if (!story && titleFromUrl) {
        const normalizedTitle = titleFromUrl
            .replace(/\+/g, " ")
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .trim()
            .toLowerCase();

        story = searchStories.find(item =>
            item.title.trim().toLowerCase() === normalizedTitle
        );
    }

    const readerCover = document.querySelector("#readerCover");

if (readerCover && story) {
    const cover = story.cover || story.image;

    if (cover) {
        readerCover.src = cover.startsWith("images/")
            ? cover
            : `images/${cover}`;

        readerCover.alt = `${story.title} cover`;
    }
}

    

const storyData = storyChapters[story?.id];
const chapters = storyData
    ? storyData.chapters
    : [];

    if (story && chapters.length > 0) {
        readerTitleElement.textContent = story.title;
        document.title = `${story.title} | Animex`;

       
        if (chapterSelect) {
            chapterSelect.innerHTML = "";

            chapters.forEach(chapter => {
                const option = document.createElement("option");

                option.value = chapter.number;
                option.textContent =
                    `Chapter ${chapter.number}: ${chapter.title}`;

                chapterSelect.appendChild(option);
            });
        }

        
        if (chapterList) {
            chapterList.innerHTML = "";

            chapters.forEach(chapter => {
                const button = document.createElement("button");

                button.type = "button";
                button.className = "chapter-list-item";
                button.textContent =
                    `Chapter ${chapter.number}: ${chapter.title}`;

                button.addEventListener("click", () => {
                    showChapter(chapter.number);
                });

                chapterList.appendChild(button);
            });
        }

      
        function showChapter(number) {
            const chapterNumber = Math.max(
                1,
                Math.min(chapters.length, Number(number) || 1)
            );

            const selectedChapter = chapters.find(
                item => item.number === chapterNumber
            );

            if (!selectedChapter) return;

            if (chapterTitleElement) {
                chapterTitleElement.textContent =
                    `Chapter ${selectedChapter.number}`;
            }

            if (novelChapterHeading) {
                novelChapterHeading.textContent =
                    `Chapter ${selectedChapter.number}: ${selectedChapter.title}`;
            }

            if (chapterSelect) {
                chapterSelect.value = String(selectedChapter.number);
            }

            if (readerContent) {
                readerContent.replaceChildren();

                selectedChapter.paragraphs.forEach(paragraphText => {
                    const paragraph = document.createElement("p");
                    paragraph.textContent = paragraphText;
                    readerContent.appendChild(paragraph);
                });
            }

          
            prevButtons.forEach(button => {
                button.disabled = chapterNumber === 1;
            });

            nextButtons.forEach(button => {
                button.disabled = chapterNumber === chapters.length;
            });

          
            if (chapterList) {
                const chapterButtons = chapterList.querySelectorAll(
                    ".chapter-list-item"
                );

                chapterButtons.forEach((button, index) => {
                    const isActive = index + 1 === chapterNumber;

                    button.classList.toggle("active", isActive);

                    if (isActive) {
                        button.setAttribute("aria-current", "true");
                    } else {
                        button.removeAttribute("aria-current");
                    }
                });
            }

            
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set("id", story.id);
            newUrl.searchParams.set("chapter", chapterNumber);

            window.history.replaceState({}, "", newUrl);
        }

       
        if (chapterSelect) {
            chapterSelect.addEventListener("change", () => {
                showChapter(chapterSelect.value);
            });
        }

        
        prevButtons.forEach(button => {
            button.addEventListener("click", () => {
                showChapter((parseInt(chapterSelect?.value, 10) || chapterFromUrl) - 1);
            });
        });

        
        nextButtons.forEach(button => {
            button.addEventListener("click", () => {
                showChapter((parseInt(chapterSelect?.value, 10) || chapterFromUrl) + 1);
            });
        });

       
        showChapter(chapterFromUrl);

    } else {
        readerTitleElement.textContent = "Story Not Found";
        document.title = "Story Not Found | Animex";

        if (chapterTitleElement) {
            chapterTitleElement.textContent = "";
        }

        if (novelChapterHeading) {
            novelChapterHeading.textContent = "Story Not Found";
        }

        if (readerContent) {
            readerContent.textContent =
                "The story could not be found. Please return to Browse and select a story.";
        }

        console.error("Story could not be identified.");
        console.error("Current URL:", window.location.href);
    }
}

const readingProgressBar = document.getElementById("readingProgressBar");

if (readingProgressBar) {
    function updateReadingProgress() {
        const scrollTop = window.scrollY;
        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollableHeight > 0
            ? (scrollTop / scrollableHeight) * 100
            : 0;

        readingProgressBar.style.width = `${progress}%`;
    }

    window.addEventListener("scroll", updateReadingProgress);
    window.addEventListener("resize", updateReadingProgress);

    updateReadingProgress();
}

const readerCover = document.querySelector("#readerCover");

if (readerCover && story) {
    readerCover.src = story.cover || story.image || "images/placeholder.jpg";
    readerCover.alt = `${story.title || "Story"} cover`;
}




