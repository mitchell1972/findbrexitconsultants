# Find Consultants Page - Structure Analysis Report

## Page Overview
- **URL**: https://4zco4jfuq9jq.space.minimax.io/find-consultants
- **Title**: FindBrexitConsultants.co.uk - Find Consultants Directory
- **Purpose**: Directory page for browsing and connecting with Brexit compliance consultants
- **Results**: Currently displaying 6 consultants found

## Search and Filter Functionality

### Main Search Bar
- **Location**: Center of page, above consultant listings
- **Placeholder**: "Search consultants by company name, service, or location"
- **Element Index**: [9] (interactive text input)

### Filter Options
- **Filters Button**: Element [10] - likely opens advanced filter panel
- **Sort Dropdown**: Element [11] with options:
  - Most Relevant (default)
  - Featured First
  - Highest Rated
  - Fastest Response
  - Newest First

### Header Quick Search
- **Location**: Top navigation bar
- **Element Index**: [2] (text input) + [3] (search button)
- **Placeholder**: "Search consultants by service, location, or company"

## Consultant Card Structure

Each consultant card follows a consistent, comprehensive layout:

### Card Information Display
1. **Header Information**:
   - **Company Name**: e.g., "UK Government Scotland - International Trade Division"
   - **Individual Name**: e.g., "Charles Burke"
   - **Location**: e.g., "Edinburgh"
   - **Price Range**: Indicated by £ symbols (£, ££, £££)

2. **Key Metrics**:
   - **Response Time**: e.g., "2h response", "4h response", "24h response"
   - **Experience**: Years of expertise (e.g., "15 years", "8 years", "6 years")
   - **Team Size**: Staff range (e.g., "25+", "15-25", "3-8", "5-10")

3. **Service Information**:
   - **Detailed Description**: Comprehensive overview of expertise and services
   - **Specializations**: Focus areas (Brexit compliance, international trade, etc.)
   - **Free Consultation**: Green badge when available

### Visual Indicators
- **Verification Status**: Green checkmarks for vetted consultants
- **Rating System**: Star ratings displayed
- **Pricing Tier**: £ symbols indicating cost level
- **Free Consultation Badge**: Green highlight for available consultations

## Accessing Individual Consultant Profiles

### Primary Access Methods

#### 1. View Profile Links
- **Function**: Navigate to detailed consultant profile page
- **URL Pattern**: `/consultant/{unique-consultant-id}`
- **Example URLs**:
  - `/consultant/5c1cf28a-d8bd-4500-b2e2-e0164a1461c6` (Charles Burke)
  - `/consultant/b3afeec3-7859-47c2-8e51-23e97c50475b` (Dr Anna Jerzewska)
  - `/consultant/25763b26-4ed5-4dc8-9088-47e6740763f9` (Gwern Ifans)

#### 2. Contact Links  
- **Function**: Direct contact/inquiry form
- **URL Pattern**: `/contact/{unique-consultant-id}`
- **Example URLs**:
  - `/contact/5c1cf28a-d8bd-4500-b2e2-e0164a1461c6`
  - `/contact/b3afeec3-7859-47c2-8e51-23e97c50475b`

### Interactive Elements Mapping

| Consultant | View Profile Element | Contact Element |
|-----------|---------------------|-----------------|
| Charles Burke (UK Government Scotland) | [12] | [13] |
| Dr Anna Jerzewska (Trade & Borders) | [14] | [15] |
| Gwern Ifans (Wales Trade Policy) | [16] | [17] |
| Rebecca Bermingham (TRIUMPH) | [18] | [19] |
| Mary Meehan (InterTradeIreland) | [20] | [21] |
| Chris Ashworth (Northern Customs) | [22] | [23] |

## Detailed Consultant Examples

### Example 1: Charles Burke
- **Company**: UK Government Scotland - International Trade Division
- **Location**: Edinburgh
- **Experience**: 15 years
- **Team Size**: 25+
- **Response Time**: 2h response
- **Price Range**: £££
- **Free Consultation**: ✅ Available
- **Specialization**: Brexit compliance, international trade development, Scottish businesses in global markets

### Example 2: Dr Anna Jerzewska
- **Company**: Trade & Borders Consultancy
- **Location**: London
- **Experience**: 8 years
- **Team Size**: 15-25
- **Response Time**: 4h response
- **Price Range**: £££
- **Free Consultation**: ✅ Available
- **Specialization**: PhD-level expertise, customs, post-Brexit trade regulations

### Example 3: Chris Ashworth
- **Company**: Northern Customs Solutions
- **Location**: Manchester
- **Experience**: 5 years (30 years total knowledge mentioned)
- **Team Size**: 5-10
- **Response Time**: 12h response
- **Price Range**: £
- **Free Consultation**: ❌ Not available
- **Specialization**: Customs, HMRC, logistics, freight management

## Page Navigation Structure

### Header Navigation (Persistent)
- Find Consultants (current page)
- How It Works
- Pricing
- List Your Business

### Footer Categories Available
- **Services**: 6 specialized service categories
- **Locations**: 6 major UK regions
- **Industries**: 6 industry specializations
- **Company Info**: About, guides, contact options

## User Experience Insights

1. **Card Layout**: Clean, scannable grid design enables quick comparison
2. **Information Hierarchy**: Essential details (name, location, price) prominently displayed
3. **Action Clarity**: Clear "View Profile" vs "Contact" distinction
4. **Trust Indicators**: Verification badges, response times, experience levels
5. **Filtering Capability**: Multiple search and sort options for refined results

## Technical Implementation

- **Consultant IDs**: UUID format for unique identification
- **Responsive Design**: Grid layout adapts to different screen sizes
- **Interactive Elements**: All buttons and links properly indexed for automation
- **Search Functionality**: Real-time search with multiple criteria support
- **Sorting Options**: Backend-driven result organization

## Summary

The Find Consultants page provides a well-structured directory interface with comprehensive consultant information cards. Each consultant can be accessed through dedicated profile pages via unique URLs, with additional direct contact options available. The search and filtering system allows users to efficiently find relevant Brexit compliance experts based on location, services, experience, and other criteria.