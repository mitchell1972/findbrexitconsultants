# FindBrexit Consultants

A comprehensive platform connecting businesses with expert Brexit compliance consultants across the UK.

## 🌟 Features

- **Consultant Directory**: Browse and filter Brexit consultants by location, services, and expertise
- **Quote Requests**: Submit detailed quote requests to multiple consultants
- **Secure Authentication**: User registration and login with Supabase Auth
- **Payment Integration**: Stripe-powered subscription and payment processing
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Data**: Live data updates with Supabase real-time features

## 🚀 Live Demo

**Production URL**: [FindBrexitConsultants.co.uk](https://findbrexitconsultants.co.uk)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI Components
- **Backend**: Supabase (Database, Auth, Storage, Edge Functions)
- **Payments**: Stripe
- **Deployment**: Vercel with GitHub Actions
- **Testing**: Playwright for E2E testing

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mitchell1972/findbrexitconsultants.git
   cd findbrexit-consultants
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## 🚢 Deployment

### Automatic Deployment with GitHub Actions

This project is configured for automatic deployment to Vercel using GitHub Actions:

1. **Push to main/master branch** → Automatic production deployment
2. **Create pull request** → Automatic preview deployment

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy with Vercel CLI
vercel --prod
```

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL migrations from `supabase/tables/`
3. Deploy edge functions from `supabase/functions/`
4. Configure Row Level Security (RLS) policies

### Stripe Setup

1. Create Stripe account and get API keys
2. Configure webhook endpoints
3. Set up product catalog and pricing

### Vercel Setup

Required environment variables in Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`  
- `VITE_STRIPE_PUBLISHABLE_KEY`

Required GitHub Secrets for Actions:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 🧪 Testing

```bash
# Run E2E tests
npm run test:e2e

# Run tests in UI mode
npm run test:e2e:ui

# Generate test report
npm run test:e2e:report
```

## 📁 Project Structure

```
findbrexit-consultants/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks  
│   ├── contexts/           # React contexts
│   └── lib/                # Utilities and configurations
├── supabase/
│   ├── functions/          # Edge functions
│   └── tables/             # Database schemas
├── tests/                  # Playwright E2E tests
├── public/                 # Static assets
└── .github/workflows/      # GitHub Actions
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ |

## 📱 API Endpoints

### Supabase Edge Functions

- `/functions/v1/search-consultants` - Search and filter consultants
- `/functions/v1/submit-quote-request` - Handle quote submissions
- `/functions/v1/create-subscription` - Stripe subscription creation
- `/functions/v1/stripe-webhook` - Stripe webhook handler

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: [support@findbrexitconsultants.co.uk](mailto:support@findbrexitconsultants.co.uk)

## 🏗️ Roadmap

- [ ] Advanced search and filtering
- [ ] Real-time chat with consultants  
- [ ] Mobile app development
- [ ] AI-powered consultant matching
- [ ] Multi-language support

---

**Built with ❤️ for the Brexit consulting community**
