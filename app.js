/**
 * Atlas Travel Planner - Unified Application Controller
 * Connects wizard onboarding states directly to Node.js backend APIs,
 * handles persistent loading/saving, and renders high-fidelity Canvas components.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- State Variables ---
  const state = {
    destination: "",
    duration: 3,
    budgetTier: "comfort", // budget, comfort, luxury
    companion: "solo",     // solo, partner, friends, family
    vibe: "cafes",         // cafes, luxury, nature, calm, romantic, culture, adventure, photography
    memories: [],          // array of selected memory tags
    currentStep: 1,
    compiledData: null,    // holding the final active itinerary dataset
    budgetEstimate: {
      flights: 0,
      lodging: 0,
      dining: 0,
      activities: 0,
      transit: 0
    }
  };

  // --- UI Elements ---
  const el = {
    // Views
    viewHero: document.getElementById("view-hero"),
    viewWizard: document.getElementById("view-wizard"),
    viewLoader: document.getElementById("view-loader"),
    viewDashboard: document.getElementById("view-dashboard"),
    
    // Global Elements
    btnLogo: document.getElementById("btn-logo"),
    btnBackToDream: document.getElementById("btn-back-to-dream"),
    
    // Hero View Inputs
    inputDestHero: document.getElementById("input-destination"),
    btnStartDreaming: document.getElementById("btn-start-dreaming"),
    curatedCards: document.querySelectorAll(".curated-card"),
    secSavedJourneys: document.getElementById("sec-saved-journeys"),
    savedJourneysGrid: document.getElementById("saved-journeys-grid"),
    
    // Wizard Form Elements
    wizDest: document.getElementById("wiz-destination"),
    wizDuration: document.getElementById("wiz-duration"),
    durationDisplay: document.getElementById("duration-val"),
    budgetCards: document.querySelectorAll(".tier-card"),
    companionChips: document.querySelectorAll("#companion-chips .chip-btn"),
    vibeCards: document.querySelectorAll(".vibe-card"),
    btnWizPrev: document.getElementById("btn-wiz-prev"),
    btnWizNext: document.getElementById("btn-wiz-next"),
    progressBar: document.getElementById("progress-bar"),
    currentStepNum: document.getElementById("current-step-num"),
    wizardSteps: document.querySelectorAll(".wizard-step"),
    
    // Loader Elements
    loaderTitle: document.getElementById("loader-title"),
    loaderSubtitle: document.getElementById("loader-subtitle"),
    
    // Dashboard Left Panel
    dashCoverImg: document.getElementById("dash-cover-img"),
    dashCountry: document.getElementById("dash-country"),
    dashDestTitle: document.getElementById("dash-destination-title"),
    dashCoords: document.getElementById("dash-coordinates"),
    dashDuration: document.getElementById("dash-duration"),
    dashPacing: document.getElementById("dash-pacing"),
    dashCompanion: document.getElementById("dash-companion"),
    dashVibe: document.getElementById("dash-vibe"),
    dashBestTime: document.getElementById("dash-best-time"),
    dashMemoryTitle: document.getElementById("dash-memory-title"),
    dashMemoryDesc: document.getElementById("dash-memory-desc"),
    
    // Dashboard Right Panel (Tabs)
    tabBtns: document.querySelectorAll(".tab-btn"),
    tabContents: document.querySelectorAll(".tab-content"),
    btnExport: document.getElementById("btn-export-itinerary"),
    btnSaveItinerary: document.getElementById("btn-save-itinerary"),
    dashBaseVibe: document.getElementById("dash-base-vibe"),
    dashStay: document.getElementById("dash-stay"),
    
    // Containers for Dynamic Rendering
    timelineContainer: document.getElementById("timeline-itinerary-container"),
    foodContainer: document.getElementById("food-container"),
    gemsContainer: document.getElementById("gems-container"),
    photoContainer: document.getElementById("photo-spots-container"),
    tipsContainer: document.getElementById("tips-container"),
    
    // Budget Canvas & Inputs
    budgetCanvas: document.getElementById("budgetDonutChart"),
    totalCostDisplay: document.getElementById("chart-total-cost"),
    budgetLegend: document.getElementById("budget-legend"),
    sliderFlights: document.getElementById("slider-flights"),
    sliderLodging: document.getElementById("slider-lodging"),
    sliderDining: document.getElementById("slider-dining"),
    sliderActivities: document.getElementById("slider-activities"),
    sliderTransit: document.getElementById("slider-transit"),
    valFlights: document.getElementById("val-flights"),
    valLodging: document.getElementById("val-lodging"),
    valDining: document.getElementById("val-dining"),
    valActivities: document.getElementById("val-activities"),
    valTransit: document.getElementById("val-transit")
  };

  // ==========================================================================
  // VIEW MANAGER (ROUTING)
  // ==========================================================================
  
  function showView(viewId) {
    const views = [el.viewHero, el.viewWizard, el.viewLoader, el.viewDashboard];
    views.forEach(v => v.classList.remove("active"));
    
    if (viewId === "hero") {
      el.viewHero.classList.add("active");
      el.btnBackToDream.classList.add("hide");
      resetWizard();
      loadSavedJourneys(); // Reload persisted journeys list on return to home
    } else if (viewId === "wizard") {
      el.viewWizard.classList.add("active");
      el.btnBackToDream.classList.remove("hide");
    } else if (viewId === "loader") {
      el.viewLoader.classList.add("active");
      el.btnBackToDream.classList.add("hide");
    } else if (viewId === "dashboard") {
      el.viewDashboard.classList.add("active");
      el.btnBackToDream.classList.remove("hide");
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  el.btnBackToDream.addEventListener("click", () => showView("hero"));
  el.btnLogo.addEventListener("click", () => showView("hero"));

  // ==========================================================================
  // WIZARD STATE HANDLERS
  // ==========================================================================
  
  function resetWizard() {
    state.currentStep = 1;
    state.destination = "";
    el.inputDestHero.value = "";
    el.wizDest.value = "";
    el.wizDuration.value = 3;
    el.durationDisplay.textContent = "3";
    
    el.budgetCards.forEach(c => c.classList.remove("active"));
    document.querySelector('.tier-card[data-budget="comfort"]').classList.add("active");
    state.budgetTier = "comfort";
    
    el.companionChips.forEach(c => c.classList.remove("active"));
    document.querySelector('#companion-chips .chip-btn[data-val="solo"]').classList.add("active");
    state.companion = "solo";
    
    el.vibeCards.forEach(c => c.classList.remove("active"));
    document.querySelector('.vibe-card[data-vibe="cafes"]').classList.add("active");
    state.vibe = "cafes";
    
    updateWizardUI();
  }

  el.btnStartDreaming.addEventListener("click", () => {
    const dest = el.inputDestHero.value.trim();
    if (!dest) {
      alert("Please enter a destination to start your journey.");
      return;
    }
    state.destination = dest;
    el.wizDest.value = dest;
    showView("wizard");
    updateWizardUI();
  });

  el.curatedCards.forEach(card => {
    card.addEventListener("click", () => {
      const destKey = card.getAttribute("data-destination");
      state.destination = destKey;
      el.wizDest.value = destKey.charAt(0).toUpperCase() + destKey.slice(1);
      
      state.currentStep = 2;
      showView("wizard");
      updateWizardUI();
    });
  });

  el.wizDuration.addEventListener("input", (e) => {
    state.duration = parseInt(e.target.value);
    el.durationDisplay.textContent = state.duration;
  });

  el.budgetCards.forEach(card => {
    card.addEventListener("click", () => {
      el.budgetCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      state.budgetTier = card.getAttribute("data-budget");
    });
  });

  el.companionChips.forEach(chip => {
    chip.addEventListener("click", () => {
      el.companionChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.companion = chip.getAttribute("data-val");
    });
  });

  el.vibeCards.forEach(card => {
    card.addEventListener("click", () => {
      el.vibeCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      state.vibe = card.getAttribute("data-vibe");
    });
  });

  el.btnWizPrev.addEventListener("click", () => {
    if (state.currentStep > 1) {
      state.currentStep--;
      updateWizardUI();
    }
  });

  el.btnWizNext.addEventListener("click", () => {
    if (state.currentStep === 1) {
      const dest = el.wizDest.value.trim();
      if (!dest) {
        alert("Please specify a destination coordinates.");
        return;
      }
      state.destination = dest;
    }
    
    if (state.currentStep < 4) {
      state.currentStep++;
      updateWizardUI();
    } else {
      gatherStep4Memories();
      triggerCinematicLoader();
    }
  });

  function gatherStep4Memories() {
    state.memories = [];
    const checked = document.querySelectorAll('input[name="memories"]:checked');
    checked.forEach(cb => state.memories.push(cb.value));
  }

  function updateWizardUI() {
    el.wizardSteps.forEach(step => {
      step.classList.remove("active");
      if (parseInt(step.getAttribute("data-step")) === state.currentStep) {
        step.classList.add("active");
      }
    });

    const pct = (state.currentStep / 4) * 100;
    el.progressBar.style.width = `${pct}%`;
    el.currentStepNum.textContent = state.currentStep;

    el.btnWizPrev.disabled = state.currentStep === 1;
    
    if (state.currentStep === 4) {
      el.btnWizNext.textContent = "Dream Itinerary";
    } else {
      el.btnWizNext.textContent = "Next";
    }
  }

  // ==========================================================================
  // LOADER HANDLERS
  // ==========================================================================
  
  function triggerCinematicLoader() {
    showView("loader");
    
    const loadingStages = [
      { title: "Contacting cosmic vault...", status: "Sensing atmospheric waves..." },
      { title: "Compiling local routes...", status: "Gathering centuries-old secret kitchen menus..." },
      { title: "Filtering tourist crowds...", status: "Isolating silent pathways & twilight views..." },
      { title: "Structuring memory grids...", status: "Generating custom visual maps..." }
    ];
    
    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      if (stage < loadingStages.length) {
        el.loaderTitle.textContent = loadingStages[stage].title;
        el.loaderSubtitle.textContent = loadingStages[stage].status;
      } else {
        clearInterval(interval);
        compileAndSwitchToDashboard();
      }
    }, 850);
  }

  // ==========================================================================
  // BACKEND API COMMUNICATION (GENERATION & INTEGRATIONS)
  // ==========================================================================
  
  async function compileAndSwitchToDashboard() {
    try {
      const response = await fetch("/api/itinerary/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: state.destination,
          duration: state.duration,
          budgetTier: state.budgetTier,
          companion: state.companion,
          vibe: state.vibe,
          memories: state.memories
        })
      });
      
      if (!response.ok) throw new Error("Compilation API failure.");
      const data = await response.json();
      
      state.compiledData = data;
      state.budgetEstimate = JSON.parse(JSON.stringify(data.budgetEstimate));
      
      // Dynamic color grading shifts
      document.body.classList.remove("theme-default", "theme-tokyo", "theme-paris", "theme-amalfi", "theme-iceland");
      document.body.classList.add(data.themeClass || "theme-default");
      
      renderItineraryDashboard(data);
      initBudgetSliders(data);
      drawBudgetChart();
      
      // Relocate to home and trigger conversational curation audit
      showView("hero");
      openCurationChatDiscussion(data);
    } catch (err) {
      console.error(err);
      alert("Failed to curate. Make sure the Node.js backend server is actively running on port 3000.");
      showView("wizard");
    }
  }

  function openCurationChatDiscussion(data) {
    chatState.isOpen = true;
    chatEl.widget.classList.add("active");
    chatEl.log.innerHTML = "";
    chatState.history = [];
    
    const est = data.budgetEstimate;
    const totalCost = est.lodging + est.dining + est.flights + est.activities + est.transit;
    
    const introMsg = `Wanderer, I have successfully woven the coordinates of your dream:

📍 **Destination**: ${data.name}
✨ **Atmosphere**: ${data.tagline}
🛌 **Sanctuary stay**: ${data.stay}
🎒 **Duration**: ${data.duration} Days of slow drift
💰 **Estimated Total Cost**: ~$${totalCost.toLocaleString()} covering all stays, eats, and routes

Does this initial pacing and atmospheric concept feel **right** to you? 

If this looks correct, let me know (e.g., reply with **yes** or **it is right**), and I will instantly unlock your full cinematic dashboard timeline and budget controls!`;

    appendChatBubble("assistant", introMsg);
    chatState.history.push({ role: "assistant", content: introMsg });
    
    chatEl.input.focus();
  }

  // Save compiled itinerary to Express persistence
  async function saveCurrentJourney() {
    if (!state.compiledData) return;
    
    const btn = el.btnSaveItinerary;
    const originalContent = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = "Saving in vault...";
    
    try {
      // Sync slider modifications before saving
      state.compiledData.budgetEstimate = state.budgetEstimate;
      
      const response = await fetch("/api/itinerary/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.compiledData)
      });
      
      if (!response.ok) throw new Error("Save API failure.");
      const result = await response.json();
      
      // Update local cache ID
      state.compiledData.id = result.id;
      
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="icon-sm">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Journey Saved!
      `;
      btn.style.backgroundColor = "hsl(140, 75%, 35%)";
      btn.style.borderColor = "hsl(140, 75%, 40%)";
      
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalContent;
        btn.style.backgroundColor = "";
        btn.style.borderColor = "";
      }, 2000);
      
    } catch (err) {
      console.error(err);
      btn.innerHTML = "Save Failed";
      btn.style.backgroundColor = "hsl(0, 75%, 40%)";
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalContent;
        btn.style.backgroundColor = "";
      }, 2000);
    }
  }

  el.btnSaveItinerary.addEventListener("click", saveCurrentJourney);

  // Retrieve past itineraries
  async function loadSavedJourneys() {
    try {
      const response = await fetch("/api/itinerary/list");
      if (!response.ok) return;
      const list = await response.json();
      
      if (list.length === 0) {
        el.secSavedJourneys.classList.add("hide");
        return;
      }
      
      el.secSavedJourneys.classList.remove("hide");
      el.savedJourneysGrid.innerHTML = "";
      
      list.forEach(item => {
        const card = document.createElement("div");
        card.className = `curated-card ${item.themeClass || 'theme-default'}`;
        
        let coverUrl = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&width=600&auto=format&fit=crop";
        if (item.name.toLowerCase().includes("tokyo")) coverUrl = "/assets/tokyo_cover.png";
        else if (item.name.toLowerCase().includes("paris")) coverUrl = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&width=600&auto=format&fit=crop";
        else if (item.name.toLowerCase().includes("amalfi")) coverUrl = "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&width=600&auto=format&fit=crop";
        else if (item.name.toLowerCase().includes("iceland")) coverUrl = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&width=600&auto=format&fit=crop";
        
        card.style.background = `url('${coverUrl}') center/cover`;
        
        card.innerHTML = `
          <div class="card-overlay"></div>
          <div class="card-body">
            <span class="card-country">${item.duration} Days • ${item.companion}</span>
            <h3 class="card-name">${item.name}</h3>
            <p class="card-vibe">${item.tagline}</p>
          </div>
        `;
        
        card.addEventListener("click", () => reloadSavedJourneyById(item.id));
        el.savedJourneysGrid.appendChild(card);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function reloadSavedJourneyById(id) {
    showView("loader");
    el.loaderTitle.textContent = "Unlocking memory vault...";
    el.loaderSubtitle.textContent = "Translating saved coordinates...";
    
    try {
      const response = await fetch(`/api/itinerary/${id}`);
      if (!response.ok) throw new Error("Failed to pull itinerary.");
      const data = await response.json();
      
      state.compiledData = data;
      state.destination = data.name;
      state.duration = data.duration;
      state.budgetTier = data.budgetTier;
      state.companion = data.companion;
      state.vibe = data.vibe;
      state.budgetEstimate = JSON.parse(JSON.stringify(data.budgetEstimate));
      
      document.body.classList.remove("theme-default", "theme-tokyo", "theme-paris", "theme-amalfi", "theme-iceland");
      document.body.classList.add(data.themeClass || "theme-default");
      
      renderItineraryDashboard(data);
      initBudgetSliders(data);
      drawBudgetChart();
      
      showView("dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to reload this journey.");
      showView("hero");
    }
  }

  // ==========================================================================
  // ITINERARY LAYOUT RENDERER
  // ==========================================================================
  
  function renderItineraryDashboard(data) {
    el.dashDestTitle.textContent = data.name;
    el.dashCountry.textContent = data.country;
    el.dashCoords.textContent = data.coordinates;
    el.dashDuration.textContent = `${data.duration} Days`;
    el.dashPacing.textContent = data.duration <= 4 ? "Atmospheric" : data.duration <= 8 ? "Moderate Flow" : "Slow Drift";
    el.dashCompanion.textContent = data.companion;
    
    const vibeTitle = document.querySelector(`.vibe-card[data-vibe="${data.vibe}"] h5`);
    el.dashVibe.textContent = vibeTitle ? vibeTitle.textContent : data.vibe;
    el.dashBestTime.textContent = data.bestTime;
    
    let coverUrl = "/assets/tokyo_cover.png";
    if (data.name.toLowerCase().includes("paris")) coverUrl = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&width=600&auto=format&fit=crop";
    else if (data.name.toLowerCase().includes("amalfi")) coverUrl = "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&width=600&auto=format&fit=crop";
    else if (data.name.toLowerCase().includes("iceland")) coverUrl = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&width=600&auto=format&fit=crop";
    else if (!data.name.toLowerCase().includes("tokyo")) coverUrl = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&width=600&auto=format&fit=crop";
    
    el.dashCoverImg.style.background = `url('${coverUrl}') center/cover`;
    
    el.dashMemoryTitle.textContent = data.memoryHighlight.title;
    el.dashMemoryDesc.textContent = data.memoryHighlight.description;
    el.dashBaseVibe.textContent = data.baseVibe;
    el.dashStay.textContent = data.stay;
    
    // 1. Timeline Day-by-Day Render
    el.timelineContainer.innerHTML = "";
    data.itinerary.forEach(day => {
      const dayEl = document.createElement("div");
      dayEl.className = "timeline-day";
      
      let scheduleHtml = "";
      day.schedule.forEach(act => {
        scheduleHtml += `
          <div class="activity-card">
            <span class="activity-time">${act.time}</span>
            <div class="activity-body">
              <h5 class="activity-title">${act.activity}</h5>
              <p class="activity-detail">${act.detail}</p>
            </div>
          </div>
        `;
      });
      
      dayEl.innerHTML = `
        <div class="timeline-day-dot"></div>
        <span class="timeline-day-num">Day ${day.day}</span>
        <h4 class="timeline-day-title">${day.title}</h4>
        <p class="timeline-day-desc">${day.description}</p>
        <div class="timeline-activities">
          ${scheduleHtml}
        </div>
      `;
      el.timelineContainer.appendChild(dayEl);
    });

    // 2. Eats & Cafés Card Render
    el.foodContainer.innerHTML = "";
    data.food.forEach(item => {
      const foodCard = document.createElement("div");
      foodCard.className = "food-card glass-card";
      foodCard.innerHTML = `
        <h4>${item.name}</h4>
        <div class="food-type">${item.type}</div>
        <p class="food-atmosphere">${item.atmosphere}</p>
      `;
      el.foodContainer.appendChild(foodCard);
    });

    // 3. Hidden Gems & Photos
    el.gemsContainer.innerHTML = "";
    data.hiddenGems.forEach(gem => {
      const gemEl = document.createElement("div");
      gemEl.className = "gem-card glass-card";
      gemEl.innerHTML = `
        <h5>${gem.name}</h5>
        <p>${gem.vibe}</p>
      `;
      el.gemsContainer.appendChild(gemEl);
    });

    el.photoContainer.innerHTML = "";
    data.photoSpots.forEach(photo => {
      const photoEl = document.createElement("div");
      photoEl.className = "photo-card glass-card";
      photoEl.innerHTML = `
        <h5>${photo.location}</h5>
        <p>${photo.description}</p>
      `;
      el.photoContainer.appendChild(photoEl);
    });

    // 4. Local Etiquette tips
    el.tipsContainer.innerHTML = "";
    let tipsHtml = "";
    data.tips.forEach(tip => {
      tipsHtml += `
        <div class="tip-block">
          <h6>${tip.title}</h6>
          <p>${tip.detail}</p>
        </div>
      `;
    });
    
    el.tipsContainer.innerHTML = `
      <h5>Local Etiquette & Travel Secrets</h5>
      <div class="tips-list">
        ${tipsHtml}
      </div>
    `;
    
    switchTab("itinerary");
  }

  // Dashboard navigation tabs
  el.tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  function switchTab(tabId) {
    el.tabBtns.forEach(b => b.classList.remove("active"));
    el.tabContents.forEach(c => c.classList.remove("active"));
    
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(`tab-${tabId}`);
    
    if (activeBtn && activeContent) {
      activeBtn.classList.add("active");
      activeContent.classList.add("active");
    }
  }

  el.btnExport.addEventListener("click", () => {
    window.print();
  });

  // ==========================================================================
  // HIGH-DPI CANVAS BUDGET CHART & SLIDER SLOTS
  // ==========================================================================
  
  function initBudgetSliders(data) {
    const est = state.budgetEstimate;
    
    setupSlider(el.sliderFlights, el.valFlights, est.flights);
    setupSlider(el.sliderLodging, el.valLodging, est.lodging);
    setupSlider(el.sliderDining, el.valDining, est.dining);
    setupSlider(el.sliderActivities, el.valActivities, est.activities);
    setupSlider(el.sliderTransit, el.valTransit, est.transit);
  }

  function setupSlider(sliderEl, valueEl, initialVal) {
    sliderEl.max = Math.max(initialVal * 2.5, 500);
    sliderEl.min = Math.max(Math.round(initialVal * 0.3 / 10) * 10, 10);
    sliderEl.value = initialVal;
    valueEl.textContent = `$${initialVal.toLocaleString()}`;
    
    sliderEl.oninput = (e) => {
      const val = parseInt(e.target.value);
      valueEl.textContent = `$${val.toLocaleString()}`;
      
      const id = sliderEl.id.replace("slider-", "");
      state.budgetEstimate[id] = val;
      
      drawBudgetChart();
    };
  }

  function drawBudgetChart() {
    const canvas = el.budgetCanvas;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    
    const size = 220;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);
    
    const center = size / 2;
    const radius = 85;
    const thickness = 18;
    
    const est = state.budgetEstimate;
    const categories = [
      { label: "Stays / Lodging", amount: est.lodging, color: "hsl(215, 90%, 55%)" },
      { label: "Dining & Eats", amount: est.dining, color: "hsl(40, 95%, 55%)" },
      { label: "Flights / Transit", amount: est.flights, color: "hsl(330, 90%, 60%)" },
      { label: "Experiences", amount: est.activities, color: "hsl(150, 80%, 50%)" },
      { label: "Local Transit", amount: est.transit, color: "hsl(270, 85%, 60%)" }
    ];
    
    const total = categories.reduce((sum, c) => sum + c.amount, 0);
    el.totalCostDisplay.textContent = `$${total.toLocaleString()}`;
    
    ctx.clearRect(0, 0, size, size);
    
    let startAngle = -Math.PI / 2;
    
    if (total === 0) {
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.lineWidth = thickness;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.stroke();
      return;
    }
    
    categories.forEach(cat => {
      const sliceAngle = (cat.amount / total) * Math.PI * 2;
      if (sliceAngle > 0.005) {
        ctx.beginPath();
        ctx.arc(center, center, radius, startAngle, startAngle + sliceAngle);
        ctx.lineWidth = thickness;
        ctx.strokeStyle = cat.color;
        ctx.lineCap = "round";
        ctx.stroke();
      }
      startAngle += sliceAngle;
    });

    ctx.beginPath();
    ctx.arc(center, center, radius - thickness / 2 - 2, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.stroke();
    
    renderBudgetLegend(categories, total);
  }

  function renderBudgetLegend(categories, total) {
    el.budgetLegend.innerHTML = "";
    categories.forEach(cat => {
      const pct = total > 0 ? Math.round((cat.amount / total) * 100) : 0;
      
      const item = document.createElement("div");
      item.className = "legend-item";
      item.innerHTML = `
        <div class="legend-label-group">
          <span class="legend-color-dot" style="background-color: ${cat.color};"></span>
          <span>${cat.label}</span>
        </div>
        <div class="legend-value">$${cat.amount.toLocaleString()} <span style="color: var(--text-subtle); margin-left: 4px;">(${pct}%)</span></div>
      `;
      el.budgetLegend.appendChild(item);
    });
  }

  // ==========================================================================
  // FLOATING AI CHATBOT CONCIERGE CONTROLLER
  // ==========================================================================
  
  const chatState = {
    isOpen: false,
    history: []
  };
  
  const chatEl = {
    triggerBtn: document.getElementById("btn-chat-trigger"),
    widget: document.getElementById("chat-widget"),
    closeBtn: document.getElementById("btn-chat-close"),
    form: document.getElementById("chat-input-form"),
    input: document.getElementById("input-chat-message"),
    log: document.getElementById("chat-messages-log")
  };

  chatEl.triggerBtn.addEventListener("click", () => {
    chatState.isOpen = !chatState.isOpen;
    if (chatState.isOpen) {
      chatEl.widget.classList.add("active");
      chatEl.input.focus();
      chatEl.log.scrollTop = chatEl.log.scrollHeight;
    } else {
      chatEl.widget.classList.remove("active");
    }
  });

  chatEl.closeBtn.addEventListener("click", () => {
    chatState.isOpen = false;
    chatEl.widget.classList.remove("active");
  });

  chatEl.form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = chatEl.input.value.trim();
    if (!text) return;
    
    chatEl.input.value = "";
    
    appendChatBubble("user", text);
    const userTurn = { role: "user", content: text };

    // --- Dynamic Chat Pacing Detection & Switch Auto-Flipping ---
    const lowerText = text.toLowerCase();
    const toggleEl = document.getElementById("chat-mode-toggle");
    
    const detectsDetail = lowerText.includes("detail") || 
                          lowerText.includes("explain") || 
                          lowerText.includes("elaborate") || 
                          lowerText.includes("describe") || 
                          lowerText.includes("tell me more") || 
                          lowerText.includes("long") || 
                          lowerText.includes("comprehensive") || 
                          lowerText.includes("full") ||
                          lowerText.includes("sensory") ||
                          lowerText.includes("expanded") ||
                          lowerText.includes("more info");

    const detectsShort = lowerText.includes("short") || 
                         lowerText.includes("brief") || 
                         lowerText.includes("summarize") || 
                         lowerText.includes("concise") ||
                         lowerText.includes("less info");
    
    if (toggleEl) {
      if (detectsDetail) {
        toggleEl.checked = true;
      } else if (detectsShort) {
        toggleEl.checked = false;
      }
    }
    
    const wantsDetail = toggleEl ? toggleEl.checked : false;

    // --- Conversational Curation Gate approval check ---
    const isApproving = lowerText.match(/(yes|right|correct|perfect|unlock|show|looks good|great|approve|sure|ok|yep|yeah)/);
    
    if (state.compiledData && el.viewDashboard.classList.contains("active") === false && isApproving) {
      const typingIndicator = appendTypingIndicator();
      setTimeout(() => {
        typingIndicator.remove();
        const successMsg = `Marvelous. Unlocking your cinematic memory vault and painting the dashboard now. Explore your details...`;
        appendChatBubble("assistant", successMsg);
        
        setTimeout(() => {
          showView("dashboard");
          chatState.isOpen = false;
          chatEl.widget.classList.remove("active");
        }, 1200);
      }, 700);
      return;
    }
    
    const typingIndicator = appendTypingIndicator();
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: chatState.history,
          itineraryContext: state.compiledData,
          wantsDetail: wantsDetail
        })
      });
      
      typingIndicator.remove();
      
      if (!response.ok) throw new Error("Chat completions failure.");
      const result = await response.json();
      
      appendChatBubble("assistant", result.reply);
      
      chatState.history.push(userTurn);
      chatState.history.push({ role: "assistant", content: result.reply });
      
      if (chatState.history.length > 12) {
        chatState.history = chatState.history.slice(chatState.history.length - 12);
      }
      
    } catch (err) {
      console.error(err);
      typingIndicator.remove();
      appendChatBubble("assistant", "Atlas has hit a foggy mountain path and lost connection. Make sure the Node.js backend server is running.");
    }
  });

  function appendChatBubble(role, content) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble chat-bubble-${role === 'user' ? 'user' : 'atlas'}`;
    
    // High-fidelity Markdown and Table Parser
    const lines = content.split("\n");
    let inTable = false;
    let tableHtml = "";
    let resultLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Parse Markdown Tables
      if (line.startsWith("|") && line.endsWith("|")) {
        // Skip separator line (e.g. |:---|:---| or |---|)
        if (line.match(/^\|[\s\-\:\+\|]+\|$/)) {
          continue;
        }
        
        const cells = line.split("|").slice(1, -1).map(c => c.trim());
        
        if (!inTable) {
          inTable = true;
          tableHtml = `<div class="chat-table-wrapper"><table class="chat-table"><thead><tr>`;
          cells.forEach(cell => {
            tableHtml += `<th>${cell}</th>`;
          });
          tableHtml += `</tr></thead><tbody>`;
        } else {
          tableHtml += `<tr>`;
          cells.forEach(cell => {
            tableHtml += `<td>${cell}</td>`;
          });
          tableHtml += `</tr>`;
        }
      } else {
        if (inTable) {
          inTable = false;
          tableHtml += `</tbody></table></div>`;
          resultLines.push(tableHtml);
          tableHtml = "";
        }
        resultLines.push(lines[i]);
      }
    }
    
    if (inTable) {
      tableHtml += `</tbody></table></div>`;
      resultLines.push(tableHtml);
    }
    
    let html = resultLines.join("\n");
    
    // Inline bold & italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Headers
    html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
    
    // Blockquotes
    html = html.replace(/^>\s+(.*)$/gm, '<blockquote>$1</blockquote>');
    
    // Convert Markdown lists to HTML lists
    const splitLines = html.split("\n");
    let inList = false;
    let listFormattedLines = [];
    
    for (let j = 0; j < splitLines.length; j++) {
      const l = splitLines[j].trim();
      if ((l.startsWith("- ") || l.startsWith("* ")) && !l.includes("<table") && !l.includes("<div") && !l.includes("<tr") && !l.includes("<td") && !l.includes("<th")) {
        const itemContent = l.substring(2);
        if (!inList) {
          inList = true;
          listFormattedLines.push("<ul>");
        }
        listFormattedLines.push(`<li>${itemContent}</li>`);
      } else {
        if (inList) {
          inList = false;
          listFormattedLines.push("</ul>");
        }
        listFormattedLines.push(splitLines[j]);
      }
    }
    if (inList) {
      listFormattedLines.push("</ul>");
    }
    
    // Render lines, converting free breaks to <br>
    html = listFormattedLines.map(l => {
      const trimmed = l.trim();
      if (!trimmed) return "";
      // If it ends with or starts with an HTML block element, do not append a break
      if ((trimmed.endsWith(">") || trimmed.startsWith("<")) && !trimmed.startsWith("<strong>") && !trimmed.startsWith("<em>")) {
        return l;
      }
      return l + "<br>";
    }).join("");
    
    bubble.innerHTML = html;
    chatEl.log.appendChild(bubble);
    
    chatEl.log.scrollTo({
      top: chatEl.log.scrollHeight,
      behavior: "smooth"
    });
  }

  function appendTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.innerHTML = `
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `;
    chatEl.log.appendChild(indicator);
    chatEl.log.scrollTo({
      top: chatEl.log.scrollHeight,
      behavior: "smooth"
    });
    return indicator;
  }

  // Initial load view setup
  showView("hero");
});
