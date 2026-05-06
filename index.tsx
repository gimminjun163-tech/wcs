
// --- TYPES ---
interface Team {
    name: string;
    pot?: number;
    attack: number;
    midfield: number;
    defense: number;
}

interface TeamDetailedStats {
    attack: number;
    midfield: number;
    defense: number;
}

interface KnockoutMatchResult {
  score: string;
  winner: string;
  loser:string;
}

interface GroupMatchResult {
    country1_score: number;
    country2_score: number;
}

interface TeamStats {
    name: string;
    attack: number;
    midfield: number;
    defense: number;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
}

interface Group {
    name: string;
    teams: TeamStats[];
}

interface Match {
  id: string;
  teams: [string | null, string | null];
  result?: KnockoutMatchResult;
}

interface Round {
  name: string;
  matches: Match[];
}

interface SavedState {
    groups: Group[];
    tournament: Round[];
    thirdPlaceMatch: Match | null;
    finalMatch: Match | null;
}

const App = () => {
  // --- DOM ELEMENTS ---
  const simulateBtn = document.getElementById('simulate-btn') as HTMLButtonElement;
  const customizeBtn = document.getElementById('customize-btn') as HTMLButtonElement;
  const loadBtn = document.getElementById('load-btn') as HTMLButtonElement;
  const speedSlider = document.getElementById('speed-slider') as HTMLInputElement;
  const preTournamentRankingsSection = document.getElementById('pre-tournament-rankings') as HTMLElement;
  const rankingsContainer = document.getElementById('rankings-container') as HTMLElement;
  const groupDrawContainer = document.getElementById('group-draw-container') as HTMLElement;
  const groupStageContainer = document.getElementById('group-stage-container') as HTMLElement;
  const bracketContainer = document.getElementById('bracket-container') as HTMLElement;
  const finalMatchesContainer = document.getElementById('final-matches-container') as HTMLElement;
  const championContainer = document.getElementById('champion-container') as HTMLElement;
  const finalStandingsContainer = document.getElementById('final-standings-container') as HTMLElement;
  
  // Details Modal
  const detailsModal = document.getElementById('details-modal') as HTMLElement;
  const modalBody = document.getElementById('modal-body') as HTMLElement;
  const modalCloseBtn = document.querySelector('#details-modal .modal-close-btn') as HTMLButtonElement;

  // Customization Modal
  const customizeModal = document.getElementById('customize-modal') as HTMLElement;
  const customizeModalCloseBtn = document.getElementById('customize-modal-close-btn') as HTMLButtonElement;
  const availableTeamsList = document.getElementById('available-teams-list') as HTMLElement;
  const selectedTeamsList = document.getElementById('selected-teams-list') as HTMLElement;
  const selectedTeamsHeader = document.getElementById('selected-teams-header') as HTMLElement;
  const saveCustomizationBtn = document.getElementById('save-customization-btn') as HTMLButtonElement;

  // --- CONSTANTS ---
  const ALL_TEAMS_DATA: Team[] = [
    // Default 32
    { name: "France", attack: 93, midfield: 93, defense: 90 },
    { name: "Brazil", attack: 95, midfield: 90, defense: 88 },
    { name: "Argentina", attack: 93, midfield: 91, defense: 89 },
    { name: "England", attack: 92, midfield: 92, defense: 93 },
    { name: "Spain", attack: 89, midfield: 93.5, defense: 87.5 },
    { name: "Portugal", attack: 92, midfield: 89, defense: 86 },
    { name: "Netherlands", attack: 89, midfield: 88, defense: 86 },
    { name: "Belgium", attack: 88.5, midfield: 88.5, defense: 82 },
    { name: "Germany", attack: 89, midfield: 88, defense: 86 },
    { name: "Croatia", attack: 82, midfield: 90, defense: 81 },
    { name: "Italy", attack: 88, midfield: 87, defense: 91 },
    { name: "Uruguay", attack: 87, midfield: 80, defense: 81 },
    { name: "Colombia", attack: 83, midfield: 82, defense: 80 },
    { name: "Switzerland", attack: 79, midfield: 81, defense: 79 },
    { name: "Denmark", attack: 79, midfield: 80, defense: 78 },
    { name: "Senegal", attack: 81, midfield: 76, defense: 75 },
    { name: "Mexico", attack: 81, midfield: 79, defense: 76 },
    { name: "USA", attack: 78, midfield: 79, defense: 75 },
    { name: "Japan", attack: 75, midfield: 78, defense: 72 },
    { name: "Morocco", attack: 78, midfield: 77, defense: 80 },
    { name: "Sweden", attack: 76, midfield: 75, defense: 77 },
    { name: "Poland", attack: 85, midfield: 70, defense: 72 },
    { name: "Serbia", attack: 82, midfield: 78, defense: 71 },
    { name: "Nigeria", attack: 83, midfield: 75, defense: 69 },
    { name: "South Korea", attack: 79, midfield: 80, defense: 74 },
    { name: "Chile", attack: 79, midfield: 78, defense: 70 },
    { name: "Ghana", attack: 76, midfield: 74, defense: 70 },
    { name: "Cameroon", attack: 77, midfield: 72, defense: 71 },
    { name: "Ecuador", attack: 74, midfield: 73, defense: 69 },
    { name: "Australia", attack: 70, midfield: 68, defense: 71 },
    { name: "Canada", attack: 75, midfield: 69, defense: 65 },
    { name: "Saudi Arabia", attack: 70, midfield: 69, defense: 63 },
    // Additional Teams
    { name: "Ukraine", attack: 80, midfield: 82, defense: 76 },
    { name: "Austria", attack: 78, midfield: 81, defense: 77 },
    { name: "Norway", attack: 84, midfield: 79, defense: 74 },
    { name: "Scotland", attack: 73, midfield: 76, defense: 75 },
    { name: "Hungary", attack: 77, midfield: 78, defense: 76 },
    { name: "Czech Republic", attack: 79, midfield: 77, defense: 75 },
    { name: "Turkey", attack: 78, midfield: 79, defense: 74 },
    { name: "Greece", attack: 72, midfield: 75, defense: 79 },
    { name: "Peru", attack: 76, midfield: 75, defense: 73 },
    { name: "Paraguay", attack: 74, midfield: 73, defense: 75 },
    { name: "Venezuela", attack: 73, midfield: 72, defense: 70 },
    { name: "Ivory Coast", attack: 80, midfield: 76, defense: 73 },
    { name: "Egypt", attack: 82, midfield: 75, defense: 74 },
    { name: "Algeria", attack: 79, midfield: 77, defense: 75 },
    { name: "Tunisia", attack: 73, midfield: 74, defense: 76 },
    { name: "South Africa", attack: 72, midfield: 73, defense: 71 },
    { name: "Iran", attack: 75, midfield: 74, defense: 73 },
    { name: "Qatar", attack: 74, midfield: 72, defense: 70 },
    { name: "Iraq", attack: 70, midfield: 71, defense: 69 },
    { name: "UAE", attack: 71, midfield: 73, defense: 68 },
    { name: "New Zealand", attack: 68, midfield: 69, defense: 70 },
    { name: "Costa Rica", attack: 73, midfield: 72, defense: 75 },
    { name: "Panama", attack: 69, midfield: 70, defense: 68 },
    { name: "Jamaica", attack: 76, midfield: 70, defense: 67 },
  ];
  const DEFAULT_TEAM_NAMES = new Set(ALL_TEAMS_DATA.slice(0, 32).map(t => t.name));

  let teamStatsData: { [key: string]: TeamDetailedStats } = {};

  const ROUND_NAMES = ["Round of 16", "Quarter-finals", "Semi-finals", "Final"];
  const LOCAL_STORAGE_KEY = 'worldCupSimState';
  
  // --- STATE ---
  let allTeams: Team[] = JSON.parse(JSON.stringify(ALL_TEAMS_DATA));
  let selectedTeamNames: Set<string> = new Set(DEFAULT_TEAM_NAMES);
  let currentTeams: Team[] = []; // The 32 teams for the simulation with pots

  let groups: Group[] = [];
  let tournament: Round[] = [];
  let thirdPlaceMatch: Match | null = null;
  let finalMatch: Match | null = null;
  let simulationSpeed = 1;

  // --- INITIALIZATION ---
  const initializeTeams = () => {
    const selectedTeams = allTeams.filter(t => selectedTeamNames.has(t.name));
    const teamsWithOverall = selectedTeams.map(team => ({
        ...team,
        overall: Math.round((team.attack + team.midfield + team.defense) / 3)
    }));
    teamsWithOverall.sort((a, b) => b.overall - a.overall);

    currentTeams = teamsWithOverall.map((team, index) => {
        const pot = Math.floor(index / 8) + 1;
        return { ...team, pot };
    });
    renderTeamRankings(currentTeams);
  }
  
  // --- UTILITY FUNCTIONS ---
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms / simulationSpeed));
  const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

  // --- RENDER FUNCTIONS ---
    const renderTeamRankings = (teams: Team[]) => {
        const teamsWithOverall = teams.map(team => ({
            ...team,
            overall: Math.round((team.attack + team.midfield + team.defense) / 3)
        })).sort((a, b) => b.overall - a.overall);

        const rankingsHtml = teamsWithOverall.map((team, index) => `
            <li class="ranking-item">
                <span class="rank">${index + 1}</span>
                <span class="team-name">${team.name}</span>
                <span class="overall-score">${team.overall}</span>
            </li>
        `).join('');

        rankingsContainer.innerHTML = `<ol class="rankings-list">${rankingsHtml}</ol>`;
    };

    const renderGroupTables = (highlightQualified = false) => {
      groupStageContainer.innerHTML = '';
      groups.forEach(group => {
          const groupContainer = document.createElement('div');
          groupContainer.className = 'group-container';

          let tableRows = group.teams.map((team, index) => {
              const qualifiedClass = highlightQualified && index < 2 ? 'qualified' : '';
              return `<tr class="${qualifiedClass}">
                  <td>${team.name}</td>
                  <td>${team.played}</td>
                  <td>${team.won}</td>
                  <td>${team.drawn}</td>
                  <td>${team.lost}</td>
                  <td>${team.goalDifference}</td>
                  <td>${team.points}</td>
              </tr>`;
          }).join('');

          groupContainer.innerHTML = `
              <h3 class="group-title">${group.name}</h3>
              <table class="group-table">
                  <thead>
                      <tr><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr>
                  </thead>
                  <tbody>${tableRows}</tbody>
              </table>
          `;
          groupStageContainer.appendChild(groupContainer);
      });
  };

  const renderBracket = () => {
    bracketContainer.innerHTML = '';
    const roundsToRender = tournament.filter(r => r.name !== 'Final'); // Don't render final in bracket
    roundsToRender.forEach((round) => {
        const roundEl = document.createElement('div');
        roundEl.className = 'round';
        roundEl.innerHTML = `<h2 class="round-title">${round.name}</h2>`;

        round.matches.forEach(match => {
            const matchEl = document.createElement('div');
            matchEl.className = 'match';
            matchEl.id = match.id;

            let topTeamName: string | null, bottomTeamName: string | null;
            let topTeamScore: string, bottomTeamScore: string;
            let topTeamClass: string, bottomTeamClass: string;

            if (match.result) {
                const [originalTeam1, originalTeam2] = match.teams;
                const isOriginalTeam1Winner = match.result.winner === originalTeam1;
                
                topTeamName = isOriginalTeam1Winner ? originalTeam1 : originalTeam2;
                bottomTeamName = isOriginalTeam1Winner ? originalTeam2 : originalTeam1;
                topTeamClass = 'winner';
                bottomTeamClass = 'loser';

                const score = match.result.score;
                if (score.includes('p')) {
                    const mainScore = score.split('(')[0].trim();
                    const penScore = score.split('(')[1].replace('p)', '');
                    const [s1, s2] = mainScore.split('-').map(s => s.trim());
                    const [p1, p2] = penScore.split('-').map(s => s.trim());

                    if (isOriginalTeam1Winner) {
                        topTeamScore = `${s1} (${p1})`;
                        bottomTeamScore = `${s2} (${p2})`;
                    } else {
                        topTeamScore = `${s2} (${p2})`;
                        bottomTeamScore = `${s1} (${p1})`;
                    }
                } else {
                    const [s1, s2] = score.split('-').map(s => s.trim());
                    if (isOriginalTeam1Winner) {
                        topTeamScore = s1;
                        bottomTeamScore = s2;
                    } else {
                        topTeamScore = s2;
                        bottomTeamScore = s1;
                    }
                }

                matchEl.classList.add('complete');
                matchEl.onclick = () => showMatchDetails(topTeamName!, bottomTeamName!);
            } else {
                [topTeamName, bottomTeamName] = match.teams;
                topTeamScore = topTeamName ? `<div class="loading-dots"><span></span><span></span><span></span></div>` : '&nbsp;';
                bottomTeamScore = bottomTeamName ? `<div class="loading-dots"><span></span><span></span><span></span></div>` : '&nbsp;';
                topTeamClass = '';
                bottomTeamClass = '';
            }
            
            matchEl.innerHTML = `
                <div class="match-teams">
                    <div class="team ${topTeamClass}">
                        <span class="team-name">${topTeamName || 'TBD'}</span>
                        <span class="team-score">${topTeamScore}</span>
                    </div>
                    <div class="team ${bottomTeamClass}">
                        <span class="team-name">${bottomTeamName || 'TBD'}</span>
                        <span class="team-score">${bottomTeamScore}</span>
                    </div>
                </div>
            `;
            roundEl.appendChild(matchEl);
        });
        bracketContainer.appendChild(roundEl);
    });
  };

  const renderFinalMatches = (finalists: string[], thirdPlaceContestants: string[]) => {
      finalMatchesContainer.innerHTML = `
        <h2 class="final-stage-title">Final Stage</h2>
        <div class="final-matches-grid">
            <div class="final-match-wrapper third-place-match">
                <h3 class="final-match-title">Third Place Play-off</h3>
                <div class="match" id="third-place-match">
                     <div class="match-teams">
                        <div class="team">
                            <span class="team-name">${thirdPlaceContestants[0]}</span>
                            <span class="team-score"><div class="loading-dots"><span></span><span></span><span></span></div></span>
                        </div>
                        <div class="team">
                            <span class="team-name">${thirdPlaceContestants[1]}</span>
                            <span class="team-score"><div class="loading-dots"><span></span><span></span><span></span></div></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="final-match-wrapper">
                <h3 class="final-match-title">World Cup Final</h3>
                <div class="match" id="final-match">
                     <div class="match-teams">
                        <div class="team">
                            <span class="team-name">${finalists[0]}</span>
                            <span class="team-score"><div class="loading-dots"><span></span><span></span><span></span></div></span>
                        </div>
                        <div class="team">
                            <span class="team-name">${finalists[1]}</span>
                            <span class="team-score"><div class="loading-dots"><span></span><span></span><span></span></div></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `;
  }
  
  const updateFinalMatchResult = (matchId: string, result: KnockoutMatchResult, originalTeams: [string, string]) => {
      const matchEl = document.getElementById(matchId);
      if (!matchEl) return;
      
      const [originalTeam1, originalTeam2] = originalTeams;
      const isOriginalTeam1Winner = result.winner === originalTeam1;
      const topTeamName = isOriginalTeam1Winner ? originalTeam1 : originalTeam2;
      const bottomTeamName = isOriginalTeam1Winner ? originalTeam2 : originalTeam1;
      
      let topScoreDisplay: string, bottomScoreDisplay: string;
      const score = result.score;
      if (score.includes('p')) {
          const mainScore = score.split('(')[0].trim();
          const penScore = score.split('(')[1].replace('p)', '');
          const [s1, s2] = mainScore.split('-').map(s => s.trim());
          const [p1, p2] = penScore.split('-').map(s => s.trim());

          if (isOriginalTeam1Winner) {
              topScoreDisplay = `${s1} (${p1})`;
              bottomScoreDisplay = `${s2} (${p2})`;
          } else {
              topScoreDisplay = `${s2} (${p2})`;
              bottomScoreDisplay = `${s1} (${p1})`;
          }
      } else {
          const [s1, s2] = score.split('-').map(s => s.trim());
          if (isOriginalTeam1Winner) {
              topScoreDisplay = s1;
              bottomScoreDisplay = s2;
          } else {
              topScoreDisplay = s2;
              bottomScoreDisplay = s1;
          }
      }

      matchEl.innerHTML = `
        <div class="match-teams">
            <div class="team winner">
                <span class="team-name">${topTeamName}</span>
                <span class="team-score">${topScoreDisplay}</span>
            </div>
            <div class="team loser">
                <span class="team-name">${bottomTeamName}</span>
                <span class="team-score">${bottomScoreDisplay}</span>
            </div>
        </div>
      `;

      matchEl.classList.add('complete');
      matchEl.onclick = () => showMatchDetails(result.winner, result.loser);
  }

  const renderChampion = (winner: string) => {
      championContainer.innerHTML = `
        <h2 class="champion-title">🏆 World Cup Champion 🏆</h2>
        <p class="champion-name">${winner}</p>
      `;
  };

  const renderFinalStandings = (finalResult: KnockoutMatchResult, thirdPlaceResult: KnockoutMatchResult) => {
      const standings = [
          { rank: 1, name: finalResult.winner, medal: '🥇' },
          { rank: 2, name: finalResult.loser, medal: '🥈' },
          { rank: 3, name: thirdPlaceResult.winner, medal: '🥉' },
          { rank: 4, name: thirdPlaceResult.loser, medal: '4th' }
      ];
  
      const standingsHtml = standings.map(team => `
          <li class="standing-item rank-${team.rank}">
              <span class="standing-rank">${team.medal}</span>
              <span class="standing-name">${team.name}</span>
          </li>
      `).join('');
  
      finalStandingsContainer.innerHTML = `
          <h2 class="final-standings-title">Final Standings</h2>
          <ol class="standings-list">
              ${standingsHtml}
          </ol>
      `;
  };
  
  const renderDetailedResult = (result: any) => {
    const { finalScore, playByPlay, country1, country2 } = result;
    const playByPlayHtml = playByPlay.map((event: { time: string; description: string; type: string }) => {
        let icon = '⏱️';
        if (event.type.toLowerCase() === 'goal') icon = '⚽';
        if (event.type.toLowerCase().includes('kick-off')) icon = '▶️';
        if (event.type.toLowerCase().includes('half-time')) icon = '⏸️';
        if (event.type.toLowerCase().includes('full-time')) icon = '⏹️';

        return `<li><span class="icon">${icon}</span><span class="time">${event.time}</span><span class="description">${event.description}</span></li>`;
    }).join('');

    modalBody.innerHTML = `
        <div class="result-content">
            <h2>${country1} ${finalScore} ${country2}</h2>
            <ul class="play-by-play">${playByPlayHtml}</ul>
        </div>
    `;
  };
  
  // --- STATS-BASED SIMULATION ---
  const simulateMatch = (stats1: TeamDetailedStats, stats2: TeamDetailedStats): [number, number] => {
    const TOTAL_CHANCES = 10;
    const SCORE_PROB_FACTOR = 0.45;
    let score1 = 0, score2 = 0;

    const midfieldAdvantage1 = stats1.midfield / (stats1.midfield + stats2.midfield);
    const chances1 = Math.round(TOTAL_CHANCES * midfieldAdvantage1);
    const chances2 = TOTAL_CHANCES - chances1;

    for (let i = 0; i < chances1; i++) {
        const attackPower = stats1.attack + (Math.random() * 20 - 10); // Add some randomness
        const defensePower = stats2.defense + (Math.random() * 20 - 10);
        if (Math.random() < (attackPower / (attackPower + defensePower)) * SCORE_PROB_FACTOR) {
            score1++;
        }
    }

    for (let i = 0; i < chances2; i++) {
        const attackPower = stats2.attack + (Math.random() * 20 - 10);
        const defensePower = stats1.defense + (Math.random() * 20 - 10);
        if (Math.random() < (attackPower / (attackPower + defensePower)) * SCORE_PROB_FACTOR) {
            score2++;
        }
    }

    return [score1, score2];
  };

  const getGroupMatchResult = (country1: string, country2: string, statsData: {[key: string]: TeamDetailedStats}): GroupMatchResult => {
      const [score1, score2] = simulateMatch(statsData[country1], statsData[country2]);
      return { country1_score: score1, country2_score: score2 };
  };
  
  const getKnockoutMatchResult = (country1: string, country2: string, statsData: {[key: string]: TeamDetailedStats}): KnockoutMatchResult => {
      let [score1, score2] = simulateMatch(statsData[country1], statsData[country2]);
      let winner, loser, scoreStr;

      if (score1 === score2) {
          // Simulate penalty shootout
          let pen1 = 0, pen2 = 0;
          const stats1 = statsData[country1];
          const stats2 = statsData[country2];
          const overall1 = (stats1.attack + stats1.midfield + stats1.defense) / 3;
          const overall2 = (stats2.attack + stats2.midfield + stats2.defense) / 3;

          const penProb1 = (overall1 / 100) * 0.8;
          const penProb2 = (overall2 / 100) * 0.8;
          
          for (let i = 0; i < 5; i++) {
              if (Math.random() < penProb1) pen1++;
              if (Math.random() < penProb2) pen2++;
          }
          if (pen1 === pen2) { // Sudden death
              if (Math.random() < 0.5) pen1++; else pen2++;
          }
          scoreStr = `${score1} - ${score2} (${pen1}-${pen2}p)`;
          winner = pen1 > pen2 ? country1 : country2;
          loser = pen1 > pen2 ? country2 : country1;
      } else {
          scoreStr = `${score1} - ${score2}`;
          winner = score1 > score2 ? country1 : country2;
          loser = score1 > score2 ? country2 : country1;
      }
      
      return { score: scoreStr, winner, loser };
  };

  const generateMatchReport = (result: KnockoutMatchResult, original_team1: string, original_team2: string): any => {
      const playByPlay: { time: string; description: string; type: string; }[] = [];
      playByPlay.push({ time: "0'", type: "Kick-off", description: "The match begins." });

      const mainScoreStr = result.score.split('(')[0].trim();
      const scores = mainScoreStr.split('-').map(s => parseInt(s.trim()));
      const team1_score = scores[0]; // Corresponds to original_team1
      const team2_score = scores[1]; // Corresponds to original_team2

      const goals = [];
      for (let i = 0; i < team1_score; i++) goals.push(original_team1);
      for (let i = 0; i < team2_score; i++) goals.push(original_team2);
      
      const shuffledGoals = shuffleArray(goals);
      
      const goalMinutes = Array.from({ length: shuffledGoals.length }, () => Math.floor(Math.random() * 90) + 1).sort((a, b) => a - b);

      const goalEvents = goalMinutes.map((minute, index) => ({
          minute: minute,
          description: `Goal for ${shuffledGoals[index]}!`
      }));

      // Insert half-time event
      let htInserted = false;
      goalEvents.forEach((event) => {
          if (event.minute > 45 && !htInserted) {
              playByPlay.push({ time: "HT", type: "Half-time", description: "Half-time." });
              htInserted = true;
          }
          playByPlay.push({ time: `${event.minute}'`, type: "Goal", description: event.description });
      });

      if (!htInserted) {
          playByPlay.push({ time: "HT", type: "Half-time", description: "Half-time." });
      }
      
      playByPlay.push({ time: "FT", type: "Full-time", description: `Full time. Final score: ${result.score}` });
      
      // For the header, show winner first
      const winner = result.winner;
      const loser = result.loser;
      
      let headerScore: string;
      if (result.score.includes('p')) {
          const penScoreStr = result.score.split('(')[1].replace(')','');
          const penScores = penScoreStr.replace('p','').split('-').map(s => parseInt(s.trim()));
          const team1_pen_score = penScores[0];
          const team2_pen_score = penScores[1];

          const winner_main_score = winner === original_team1 ? team1_score : team2_score;
          const loser_main_score = loser === original_team1 ? team1_score : team2_score;
          const winner_pen_score = winner === original_team1 ? team1_pen_score : team2_pen_score;
          const loser_pen_score = loser === original_team1 ? team1_pen_score : team2_pen_score;
          headerScore = `${winner_main_score} - ${loser_main_score} (${winner_pen_score}-${loser_pen_score}p)`;

      } else {
          const winner_main_score = winner === original_team1 ? team1_score : team2_score;
          const loser_main_score = loser === original_team1 ? team1_score : team2_score;
          headerScore = `${winner_main_score} - ${loser_main_score}`;
      }
      
      return { 
          finalScore: headerScore, 
          playByPlay, 
          country1: winner, 
          country2: loser 
      };
  };

  // --- LOCALSTORAGE & STATE ---
  const saveState = () => {
    const state: SavedState = {
        groups,
        tournament,
        thirdPlaceMatch,
        finalMatch,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    loadBtn.disabled = false;
  };

  const clearState = () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      loadBtn.disabled = true;
  };

  const loadState = () => {
      const savedStateJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!savedStateJSON) {
          alert('No saved simulation found.');
          return;
      }

      const savedState: SavedState = JSON.parse(savedStateJSON);

      // Restore state variables
      groups = savedState.groups;
      tournament = savedState.tournament;
      thirdPlaceMatch = savedState.thirdPlaceMatch;
      finalMatch = savedState.finalMatch;

      // Hide pre-tournament stuff and disable buttons
      preTournamentRankingsSection.style.display = 'none';
      simulateBtn.disabled = true;
      customizeBtn.disabled = true;
      loadBtn.disabled = true;

      // Clear existing UI
      groupDrawContainer.innerHTML = '';
      groupStageContainer.innerHTML = '';
      bracketContainer.innerHTML = '';
      finalMatchesContainer.innerHTML = '';
      championContainer.innerHTML = '';
      finalStandingsContainer.innerHTML = '';

      // Re-render UI based on loaded state
      if (groups.length > 0) {
          const isGroupStageComplete = groups.every(g => g.teams.every(t => t.played === 3));
          renderGroupTables(isGroupStageComplete);
      }

      if (tournament.length > 0) {
          renderBracket();
      }

      if (finalMatch && thirdPlaceMatch) {
          const finalists = finalMatch.teams.map(t => t!);
          const thirdPlaceContestants = thirdPlaceMatch.teams.map(t => t!);
          renderFinalMatches(finalists, thirdPlaceContestants);
          if (thirdPlaceMatch.result) {
              updateFinalMatchResult('third-place-match', thirdPlaceMatch.result, thirdPlaceMatch.teams as [string, string]);
          }
          if (finalMatch.result) {
               updateFinalMatchResult('final-match', finalMatch.result, finalMatch.teams as [string, string]);
               renderChampion(finalMatch.result.winner);
               renderFinalStandings(finalMatch.result, thirdPlaceMatch.result!);
          }
      }
      
      alert("Previous simulation loaded.");
  };


  // --- SIMULATION LOGIC ---
  const runGroupDraw = async (teamsToDraw: Team[]) => {
    groupDrawContainer.innerHTML = `<h2>Group Stage Draw</h2><div id="pots-container"></div>`;
    const potsContainer = document.getElementById('pots-container') as HTMLElement;
    const pots: Team[][] = [[], [], [], []];
    teamsToDraw.forEach(team => pots[team.pot! - 1].push(team));

    pots.forEach((pot, i) => {
        const potEl = document.createElement('div');
        potEl.className = 'pot';
        potEl.innerHTML = `<h3>Pot ${i + 1}</h3>`;
        const potList = document.createElement('ul');
        potList.id = `pot-${i + 1}`;
        pot.forEach(team => {
            potList.innerHTML += `<li id="pot-team-${team.name.replace(/\s+/g, '-')}">${team.name}</li>`;
        });
        potEl.appendChild(potList);
        potsContainer.appendChild(potEl);
    });

    await sleep(1000);

    groups = [];
    for (let i = 0; i < 8; i++) {
        groups.push({
            name: `Group ${String.fromCharCode(65 + i)}`,
            teams: []
        });
    }
    renderGroupTables();

    for (let potNum = 0; potNum < 4; potNum++) {
        const shuffledPot = shuffleArray([...pots[potNum]]);
        for (let groupNum = 0; groupNum < 8; groupNum++) {
            const team = shuffledPot[groupNum];
            const potTeamEl = document.getElementById(`pot-team-${team.name.replace(/\s+/g, '-')}`);
            potTeamEl?.classList.add('drawn');
            
            groups[groupNum].teams.push({
                name: team.name,
                attack: team.attack,
                midfield: team.midfield,
                defense: team.defense,
                played: 0, won: 0, drawn: 0, lost: 0, 
                goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0
            });
            renderGroupTables();
            await sleep(150);
        }
    }
    await sleep(1000);
    groupDrawContainer.innerHTML = '';
  }


  const runSimulation = async () => {
    simulateBtn.disabled = true;
    customizeBtn.disabled = true;
    loadBtn.disabled = true;
    clearState();
    preTournamentRankingsSection.style.display = 'none';

    groupStageContainer.innerHTML = '';
    bracketContainer.innerHTML = '';
    finalMatchesContainer.innerHTML = '';
    championContainer.innerHTML = '';
    finalStandingsContainer.innerHTML = '';
    thirdPlaceMatch = null;
    finalMatch = null;
    
    // Rebuild stats data from current teams
    teamStatsData = currentTeams.reduce((acc, team) => ({ 
        ...acc, 
        [team.name]: { attack: team.attack, midfield: team.midfield, defense: team.defense } 
    }), {});

    // 1. Run Group Draw
    await runGroupDraw(currentTeams);
    saveState();

    // 2. Simulate Group Stage
    for (const group of groups) {
        const matchesToPlay = [
            [group.teams[0], group.teams[1]], [group.teams[0], group.teams[2]], [group.teams[0], group.teams[3]],
            [group.teams[1], group.teams[2]], [group.teams[1], group.teams[3]], [group.teams[2], group.teams[3]]
        ];

        for(const match of matchesToPlay) {
            const result = getGroupMatchResult(match[0].name, match[1].name, teamStatsData);
            const team1 = match[0];
            const team2 = match[1];
            const score1 = result.country1_score;
            const score2 = result.country2_score;

            [team1, team2].forEach((team, j) => {
                const goalsFor = j === 0 ? score1 : score2;
                const goalsAgainst = j === 0 ? score2 : score1;
                team.played++;
                team.goalsFor += goalsFor;
                team.goalsAgainst += goalsAgainst;
                team.goalDifference = team.goalsFor - team.goalsAgainst;
                if (goalsFor > goalsAgainst) { team.won++; team.points += 3; }
                else if (goalsFor < goalsAgainst) { team.lost++; }
                else { team.drawn++; team.points += 1; }
            });
        }
        
        group.teams.sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor);
        renderGroupTables();
        saveState();
        await sleep(200);
    }
    renderGroupTables(true);

    // 3. Setup Knockout Stage with a realistic bracket structure
    const groupWinners = groups.map(g => g.teams[0].name);
    const groupRunnersUp = groups.map(g => g.teams[1].name);

    const qualifiers = [
      // Top half of bracket path
      groupWinners[0], groupRunnersUp[1], // A1 vs B2
      groupWinners[2], groupRunnersUp[3], // C1 vs D2
      groupWinners[4], groupRunnersUp[5], // E1 vs F2
      groupWinners[6], groupRunnersUp[7], // G1 vs H2
      // Bottom half of bracket path
      groupWinners[1], groupRunnersUp[0], // B1 vs A2
      groupWinners[3], groupRunnersUp[2], // D1 vs C2
      groupWinners[5], groupRunnersUp[4], // F1 vs E2
      groupWinners[7], groupRunnersUp[6], // H1 vs G2
    ];

    tournament = [{ name: ROUND_NAMES[0], matches: [] }];
    for (let i = 0; i < qualifiers.length; i += 2) {
        tournament[0].matches.push({
            id: `r0-m${i/2}`,
            teams: [qualifiers[i], qualifiers[i+1]],
        });
    }
    renderBracket();
    saveState();
    await sleep(1000);

    // 4. Run Knockout Rounds (up to Semi-finals)
    let winners = [];
    for (let i = 0; i < ROUND_NAMES.length - 1; i++) {
        const currentRound = tournament[i];
        const currentRoundWinners = [];

        for (const match of currentRound.matches) {
            const result = getKnockoutMatchResult(match.teams[0]!, match.teams[1]!, teamStatsData);
            match.result = result;
            currentRoundWinners.push(result.winner);
            renderBracket();
            await sleep(200);
        }
        
        winners = currentRoundWinners;
        saveState();
        await sleep(1000);

        if (i < ROUND_NAMES.length - 2) {
            const nextRound: Round = { name: ROUND_NAMES[i + 1], matches: [] };
            for (let k = 0; k < winners.length; k += 2) {
                nextRound.matches.push({ id: `r${i+1}-m${k/2}`, teams: [winners[k], winners[k+1]] });
            }
            tournament.push(nextRound);
            renderBracket();
            saveState();
            await sleep(500);
        }
    }
    
    // 5. Final Stage (Final and 3rd Place)
    const semiFinalRound = tournament[tournament.length - 1];
    const finalists = semiFinalRound.matches.map(m => m.result!.winner);
    const semiFinalLosers = semiFinalRound.matches.map(m => m.result!.loser);
    
    thirdPlaceMatch = { id: 'third-place-match', teams: [semiFinalLosers[0], semiFinalLosers[1]] };
    finalMatch = { id: 'final-match', teams: [finalists[0], finalists[1]] };

    renderFinalMatches(finalists, semiFinalLosers);
    saveState();
    await sleep(500);

    thirdPlaceMatch.result = getKnockoutMatchResult(thirdPlaceMatch.teams[0]!, thirdPlaceMatch.teams[1]!, teamStatsData);
    updateFinalMatchResult('third-place-match', thirdPlaceMatch.result, thirdPlaceMatch.teams as [string, string]);
    saveState();
    await sleep(500);

    finalMatch.result = getKnockoutMatchResult(finalMatch.teams[0]!, finalMatch.teams[1]!, teamStatsData);
    updateFinalMatchResult('final-match', finalMatch.result, finalMatch.teams as [string, string]);
    saveState();

    // 6. Announce Champion and Final Standings
    renderChampion(finalMatch.result.winner);
    renderFinalStandings(finalMatch.result, thirdPlaceMatch.result);
    simulateBtn.disabled = false;
    customizeBtn.disabled = false;
    loadBtn.disabled = false;
  };
  
  // --- MODAL LOGIC ---
  const showMatchDetails = (country1: string, country2: string) => {
    detailsModal.style.display = 'flex';
    modalBody.innerHTML = '<div class="loading-spinner"></div><p>Generating match report...</p>';
    
    const findMatch = (): Match | undefined => {
        // Check main tournament bracket
        for (const round of tournament) {
            const match = round.matches.find(m => 
                m.result && ((m.teams[0] === country1 && m.teams[1] === country2) || 
                (m.teams[0] === country2 && m.teams[1] === country1))
            );
            if (match) return match;
        }
        // Check final matches using the new state structure
        if (finalMatch?.result && finalMatch.teams.includes(country1) && finalMatch.teams.includes(country2)) {
            return finalMatch;
        }
        if (thirdPlaceMatch?.result && thirdPlaceMatch.teams.includes(country1) && thirdPlaceMatch.teams.includes(country2)) {
            return thirdPlaceMatch;
        }
        return undefined;
    };

    const matchData = findMatch();

    if (matchData && matchData.result) {
        const details = generateMatchReport(matchData.result, matchData.teams[0]!, matchData.teams[1]!);
        renderDetailedResult(details);
    } else {
        modalBody.innerHTML = `<p class="error-message">Could not load match details.</p>`;
    }
  };

  const hideModal = () => {
    detailsModal.style.display = 'none';
  };

  // --- CUSTOMIZATION MODAL LOGIC ---
  const renderCustomizeModal = () => {
    availableTeamsList.innerHTML = '';
    selectedTeamsList.innerHTML = '';

    const sortedAllTeams = [...allTeams].sort((a,b) => a.name.localeCompare(b.name));

    sortedAllTeams.forEach(team => {
        const item = document.createElement('div');
        item.className = 'customize-team-item';
        
        const overall = Math.round((team.attack + team.midfield + team.defense) / 3);

        const createStatInput = (stat: 'attack' | 'midfield' | 'defense', value: number) => {
            const input = document.createElement('input');
            input.type = 'number';
            input.value = String(value);
            input.min = "1";
            input.max = "100";
            input.dataset.teamName = team.name;
            input.dataset.stat = stat;
            input.addEventListener('change', handleStatChange);
            return input;
        };

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = selectedTeamNames.has(team.name);
        checkbox.dataset.teamName = team.name;
        checkbox.addEventListener('change', handleTeamSelection);

        item.appendChild(checkbox);
        item.innerHTML += `<span class="team-name" title="${team.name}">${team.name}</span>`;
        item.appendChild(createStatInput('attack', team.attack));
        item.appendChild(createStatInput('midfield', team.midfield));
        item.appendChild(createStatInput('defense', team.defense));
        item.innerHTML += `<span class="overall-score">${overall}</span>`;

        availableTeamsList.appendChild(item);
    });
    
    const selectedTeams = sortedAllTeams.filter(t => selectedTeamNames.has(t.name));
    selectedTeams.forEach(team => {
        const item = document.createElement('div');
        item.className = 'customize-team-item';
        const overall = Math.round((team.attack + team.midfield + team.defense) / 3);
        item.innerHTML = `
            <span class="team-name" title="${team.name}">${team.name}</span>
            <span>${team.attack}</span>
            <span>${team.midfield}</span>
            <span>${team.defense}</span>
            <span class="overall-score">${overall}</span>
        `;
        selectedTeamsList.appendChild(item);
    });

    selectedTeamsHeader.textContent = `Selected Teams (${selectedTeamNames.size}/32)`;
    saveCustomizationBtn.disabled = selectedTeamNames.size !== 32;
  };

  const handleTeamSelection = (e: Event) => {
    const checkbox = e.target as HTMLInputElement;
    const teamName = checkbox.dataset.teamName!;
    if (checkbox.checked) {
        selectedTeamNames.add(teamName);
    } else {
        selectedTeamNames.delete(teamName);
    }
    renderCustomizeModal();
  };

  const handleStatChange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      const teamName = input.dataset.teamName!;
      const stat = input.dataset.stat as 'attack' | 'midfield' | 'defense';
      let value = parseInt(input.value);
      if (isNaN(value) || value < 1) value = 1;
      if (value > 100) value = 100;
      input.value = String(value);

      const team = allTeams.find(t => t.name === teamName);
      if (team) {
          team[stat] = value;
      }
      renderCustomizeModal();
  };
  
  const openCustomizeModal = () => {
    customizeModal.style.display = 'flex';
    renderCustomizeModal();
  };
  
  const closeCustomizeModal = () => {
    customizeModal.style.display = 'none';
  };

  const saveCustomization = () => {
    initializeTeams();
    closeCustomizeModal();
  };

  const updateSpeed = () => {
    simulationSpeed = parseFloat(speedSlider.value);
  };

  // --- EVENT LISTENERS & INITIALIZATION ---
  initializeTeams();
  
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
      loadBtn.disabled = true;
  }
  
  updateSpeed();
  simulateBtn.addEventListener('click', runSimulation);
  loadBtn.addEventListener('click', loadState);
  customizeBtn.addEventListener('click', openCustomizeModal);
  speedSlider.addEventListener('input', updateSpeed);
  
  // Details Modal Listeners
  modalCloseBtn.addEventListener('click', hideModal);
  detailsModal.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
        hideModal();
    }
  });

  // Customization Modal Listeners
  customizeModalCloseBtn.addEventListener('click', closeCustomizeModal);
  saveCustomizationBtn.addEventListener('click', saveCustomization);
};

// Run the app
App();