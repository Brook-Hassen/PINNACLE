<script setup lang="ts">
interface CaseStudy {
  id: number
  title: string
  to: string
}

const cases: CaseStudy[] = [
  { id: 1, title: 'Brand Identity & Systems', to: '/case-studies/work-1' },
  { id: 2, title: 'High-Performance Web App', to: '/case-studies/brand-ops-suite' },
  { id: 3, title: 'Strategic Design Sprint', to: '/case-studies/launch-growth-kit' },
]

const getCase = (id: number): CaseStudy | undefined => cases.find((item) => item.id === id)
</script>

<template>
  <section id="case-studies" class="cs-section">
    <h2 class="cs-heading">Case Studies</h2>

    <div class="cs-layout">
      <div v-if="getCase(1)" class="cs-card cs-card--left">
        <RouterLink :to="getCase(1)!.to" :aria-label="`View case study: ${getCase(1)!.title}`" class="cs-pill">
          <span>View more</span>
          <span class="cs-pill__circle">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 11L11 2M11 2H4M11 2V9"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </RouterLink>
      </div>

      <div class="cs-right">
        <div v-if="getCase(2)" class="cs-card cs-card--top">
          <RouterLink :to="getCase(2)!.to" :aria-label="`View case study: ${getCase(2)!.title}`" class="cs-pill">
            <span>View more</span>
            <span class="cs-pill__circle">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 11L11 2M11 2H4M11 2V9"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </RouterLink>
        </div>

        <div v-if="getCase(3)" class="cs-card cs-card--overlap">
          <RouterLink :to="getCase(3)!.to" :aria-label="`View case study: ${getCase(3)!.title}`" class="cs-pill">
            <span>View more</span>
            <span class="cs-pill__circle">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 11L11 2M11 2H4M11 2V9"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </RouterLink>
        </div>
      </div>
    </div>

    <p class="cs-description">
      A collection of engineered solutions and visual identities. We partner with ambitious brands to
      solve complex challenges through high-performance development and strategic design.
    </p>
  </section>
</template>

<style scoped>
.cs-section {
  background: #0d0d0d;
  padding: 32px 28px 24px;
  font-family: sans-serif;
  overflow: hidden;
}

.cs-heading {
  color: #fff;
  font-size: clamp(2rem, 4.3vw, 3.35rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 24px;
}

.cs-layout {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  height: 520px;
}

.cs-card--left {
  width: 220px;
  flex-shrink: 0;
  height: 520px;
}

.cs-right {
  flex: 1;
  position: relative;
  height: 520px;
}

.cs-card--top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 300px;
  z-index: 1;
}

.cs-card--overlap {
  position: absolute;
  top: 220px;
  left: 0;
  right: 18%;
  height: 300px;
  z-index: 2;
}

.cs-card {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 18px 20px;
  box-sizing: border-box;
  background: #1a1a1a;
}

.cs-card:hover {
  filter: brightness(1.08);
}

.cs-card--top     { background: #161616; }
.cs-card--overlap { background: #1d1d1d; }

.cs-pill {
  position: relative;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px 7px 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #fff;
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.015em;
  cursor: pointer;
  white-space: nowrap;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}

.cs-pill:hover {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.08);
}

.cs-pill__circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  flex-shrink: 0;
  transition: border-color 0.2s ease;
}

.cs-pill:hover .cs-pill__circle {
  border-color: rgba(255, 255, 255, 0.6);
}

.cs-description {
  margin-top: 26px;
  color: #666;
  font-size: 0.82rem;
  line-height: 1.65;
  max-width: 380px;
}

@media (max-width: 1100px) {
  .cs-layout {
    height: 450px;
  }

  .cs-card--left {
    width: 180px;
    height: 450px;
  }

  .cs-right {
    height: 450px;
  }

  .cs-card--top {
    height: 260px;
  }

  .cs-card--overlap {
    top: 190px;
    height: 260px;
    right: 20%;
  }
}

@media (max-width: 680px) {
  .cs-section {
    padding: 20px 16px 18px;
  }

  .cs-heading {
    margin-bottom: 18px;
  }

  .cs-layout {
    flex-direction: column;
    height: auto;
    gap: 12px;
  }

  .cs-card--left {
    width: 100%;
    height: 220px;
  }

  .cs-right {
    width: 100%;
    height: 430px;
  }

  .cs-card--top {
    height: 235px;
  }

  .cs-card--overlap {
    top: 185px;
    height: 245px;
    right: 12%;
  }

  .cs-card {
    border-radius: 18px;
    padding: 12px;
  }

  .cs-pill {
    gap: 6px;
    padding: 5px 8px 5px 10px;
    font-size: 0.62rem;
  }

  .cs-pill__circle {
    width: 20px;
    height: 20px;
  }

  .cs-description {
    margin-top: 18px;
    max-width: 100%;
    font-size: 0.72rem;
    line-height: 1.45;
  }
}
</style>
