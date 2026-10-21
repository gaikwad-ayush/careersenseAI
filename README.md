# Career Sense AI

**Career Sense AI** is an intelligent career guidance, resume ATS diagnostic, career-role recommendation, and deterministic skill-gap assessment platform engineered for undergraduate engineering students and job seekers.

Built with a TypeScript-first MERN architecture optimized for modern Vercel serverless deployment.

---

## 1. Key Platform Features

- **Document Ingestion & ATS Diagnostics**:
  - Validates PDF file signatures (`%PDF-` magic bytes) to reject corrupted or non-PDF files.
  - Extracts contact information, standard sections, and technical skills using a maintainable 50+ technology taxonomy.
  - Detects passive bullet points (e.g. *"Responsible for..."*) and flags bullets lacking quantifiable impact metrics.
  - Computes an explainable 0–100% ATS completeness score based on documented criteria.
- **Transparent Mathematical Role Matching**:
  - Implements smoothed **TF-IDF vector space modeling** and **Cosine Similarity** ($\cos\theta$).
  - Separately computes **Required Skill Coverage %** and identifies matched, missing, and transferable skills.
  - Explicitly distinguishes algorithmic text similarity from real-world hiring probability.
- **Deep Skill-Gap Diagnosis & Personalized Roadmaps**:
  - Categorizes gaps by curriculum dependency (High, Medium, Low priority).
  - Estimates realistic study hours and establishes prerequisite chains.
  - Generates multi-week study schedules mapped to candidate's weekly study availability (e.g., 10 hrs/week).
  - Directly links to verified educational resources with verified URLs from **MDN Web Docs**, **freeCodeCamp**, **Harvard CS50**, and **MIT OpenCourseWare**.
  - Persists topic checkboxes to track real progress in MongoDB.
- **Real-Time Job Market Integration**:
  - Searches live tech job openings via the Remotive API with real application URLs and publisher metadata.
  - Caches results in MongoDB with 1-hour TTL.
  - Honestly reports provider status rather than fabricating synthetic job listings.
- **Grounded AI Career Coach**:
  - Powered by the Google Gemini API (`gemini-2.0-flash`).
  - Strict input sanitization and prompt injection defense.
  - Grounded in candidate's verified skills, ATS completeness, and target roles.
  - Deterministic fallback guidance when API keys are not configured.
- **Data Rights & Security**:
  - Secure HTTP-only cookies and bcrypt password hashing (12 rounds).
  - Candidate data archive export (downloadable JSON).
  - Permanent account and document cascade erasure.

---

## 2. Architecture & Technology Stack

```
   ┌──────────────────────────────────────────────────────────────┐
   │                     Next.js App Router                       │
   │      (React 19, TypeScript, Tailwind CSS, Lucide Icons)      │
   └───────────────┬──────────────────────────────┬───────────────┘
                   │                              │
         Server-Side Route Handlers       Serverless Actions
                   │                              │
   ┌───────────────┴──────────────────────────────┴───────────────┐
   │                   Career Sense Engine Layer                  │
   │  ┌─────────────────┐  ┌──────────────────┐  ┌─────────────┐  │
   │  │   PDF Parser    │  │  NLP Taxonomy &  │  │   TF-IDF    │  │
   │  │ (Magic byte sig)│  │ Skill Normalizer │  │ & Cosine Sim│  │
   │  └─────────────────┘  └──────────────────┘  └─────────────┘  │
   │  ┌─────────────────┐  ┌──────────────────┐  ┌─────────────┐  │
   │  │   Skill Gaps    │  │  Roadmap Builder │  │ AI Coach    │  │
   │  │  & Prerequisites│  │(Verified Catalogs│  │(Gemini / LLM│  │
   │  └─────────────────┘  └──────────────────┘  └─────────────┘  │
   └──────────────────────────────┬───────────────────────────────┘
                                  │
                   ┌──────────────┴──────────────┐
                   │        MongoDB Atlas        │
                   │   (Mongoose Cached Pool)    │
                   └─────────────────────────────┘
```

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS.
- **Backend**: Next.js Serverless Route Handlers, Zod schema validation.
- **Database**: MongoDB Atlas / local MongoDB with connection pooling via Mongoose.
- **Authentication**: Stateless signed JWT sessions via `jose` stored in secure HTTP-only cookies.
- **NLP / ML**: Pure TypeScript TF-IDF vectorizer, cosine angle calculator, and skill taxonomy.
- **AI Integration**: Google Gemini API via `@google/genai` (replaceable provider adapter).
- **PDF Extraction**: Serverless-compatible `unpdf` with file signature validation.
- **Testing**: Vitest test runner (26 unit & end-to-end integration tests).

---

## 3. Environment Variables Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description | Required? | Default / Example |
| :--- | :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB Atlas or local MongoDB connection string | **Yes** | `mongodb://127.0.0.1:27017/career_sense_ai` |
| `JWT_SECRET` | Secret key used to sign session JWTs (min 32 characters) | **Yes** | 32+ character random secret string |
| `APP_URL` | Base canonical application URL | **Yes** | `http://localhost:3000` |
| `GEMINI_API_KEY` | Google Gemini API key from Google AI Studio | Optional | Free key from [Google AI Studio](https://aistudio.google.com/) |
| `GEMINI_MODEL` | Gemini model variant | Optional | `gemini-2.0-flash` |
| `JOB_API_PROVIDER` | External job feed provider | Optional | `remotive` |
| `JOB_API_KEY` | External job provider API key (if using Adzuna or JSearch) | Optional | Blank for free Remotive feed |

---

## 4. Local Development

### Prerequisites
- Node.js v20+ or v22+
- npm v10+
- Running MongoDB instance (local or free MongoDB Atlas cluster)

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Run automated test suite
npm run test

# 3. Build for production (Turbopack + TypeScript typecheck)
npm run build

# 4. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Seed Catalog Initialization

To populate the database with the 11 verified career roles and their standard industry skill requirements, make a POST request to:

```bash
curl -X POST http://localhost:3000/api/seed
```

Or navigate to **Catalog Manager** (`/dashboard/admin`) as an administrator and click **"Sync Seed Catalog"**.

---

## 6. Vercel Deployment Instructions

1. Push this repository to GitHub or GitLab.
2. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository. Vercel automatically detects Next.js.
4. Under **Environment Variables**, add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string (`mongodb+srv://...`).
   - `JWT_SECRET`: A secure random 32+ character string.
   - `APP_URL`: Your Vercel deployment URL (e.g. `https://career-sense-ai.vercel.app`).
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API key.
5. Click **Deploy**.
6. After initial deployment, trigger the seed endpoint once (`POST https://your-domain.vercel.app/api/seed`) to initialize the role catalog in MongoDB Atlas.

---

## 7. Mathematical Formulation

### Term Frequency (Augmented)
$$TF(t, d) = \frac{\text{count}(t \in d)}{\text{total tokens in } d}$$

### Inverse Document Frequency (Smoothed)
$$IDF(t, D) = \ln\left(1 + \frac{|D|}{1 + df(t)}\right) + 1$$

### Cosine Similarity
$$\cos(\theta) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \|\mathbf{v}\|} = \frac{\sum_{i} u_i v_i}{\sqrt{\sum_i u_i^2} \sqrt{\sum_i v_i^2}}$$

### Required Skill Coverage
$$\text{Required Coverage} = \frac{|\text{Candidate Skills} \cap \text{Role Required Skills}|}{|\text{Role Required Skills}|} \times 100\%$$

---



