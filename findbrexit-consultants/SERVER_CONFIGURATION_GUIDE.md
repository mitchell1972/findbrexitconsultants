# Server Configuration Guide for FindBrexitConsultants.co.uk

This guide provides configuration examples for both Apache and Nginx web servers to host FindBrexitConsultants.co.uk as a Single Page Application (SPA).

## Apache Configuration (Hostinger Default)

### Using .htaccess (Included in build)
The production build includes a `.htaccess` file with:
- React Router SPA support
- Gzip compression
- Static asset caching
- Security headers
- Sensitive file protection

**Location**: `dist/.htaccess` (automatically included in build)

### Manual Apache Virtual Host
```apache
<VirtualHost *:80>
    ServerName findbrexitconsultants.co.uk
    ServerAlias www.findbrexitconsultants.co.uk
    Redirect permanent / https://findbrexitconsultants.co.uk/
</VirtualHost>

<VirtualHost *:443>
    ServerName findbrexitconsultants.co.uk
    DocumentRoot /var/www/html
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    # Enable mod_rewrite
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.html [QSA,L]
    
    # Security and performance settings from .htaccess
    Include /var/www/html/.htaccess
</VirtualHost>
```

---

## Nginx Configuration

### Using nginx.conf.example
For Nginx servers, use the provided configuration file.

**File**: `nginx.conf.example`
**Features**:
- HTTPS enforcement
- SPA routing support
- Gzip compression
- Security headers
- Static asset caching
- Rate limiting

### Installation Steps
1. Copy `nginx.conf.example` to `/etc/nginx/sites-available/findbrexitconsultants.co.uk`
2. Update SSL certificate paths
3. Adjust document root path
4. Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/findbrexitconsultants.co.uk /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## Key Features Comparison

| Feature | Apache (.htaccess) | Nginx (nginx.conf) |
|---------|-------------------|--------------------|
| SPA Routing | ✅ RewriteRule | ✅ try_files |
| Gzip Compression | ✅ mod_deflate | ✅ gzip module |
| Static Caching | ✅ mod_expires | ✅ expires directive |
| Security Headers | ✅ mod_headers | ✅ add_header |
| HTTPS Redirect | ✅ RewriteRule | ✅ return 301 |
| Rate Limiting | ❌ | ✅ limit_req |
| File Protection | ✅ <Files> | ✅ location ~ |

---

## Hosting Provider Compatibility

### Hostinger (Apache)
- **Default**: Uses Apache with .htaccess support
- **Configuration**: `.htaccess` file included in build
- **SSL**: Automatic Let's Encrypt certificates available
- **Deployment**: Upload dist/ contents to public_html/

### DigitalOcean, AWS, VPS (Nginx)
- **Configuration**: Use `nginx.conf.example`
- **SSL**: Manual certificate configuration required
- **Deployment**: Upload to configured document root

### Vercel, Netlify (Serverless)
- **Configuration**: Built-in SPA support
- **Routing**: Automatic React Router handling
- **Deployment**: Connect to Git repository

---

## Troubleshooting

### Apache Issues
- **404 on routes**: Ensure mod_rewrite is enabled
- **Files not compressed**: Check mod_deflate is loaded
- **Headers not set**: Verify mod_headers is enabled

### Nginx Issues  
- **404 on routes**: Check `try_files` directive syntax
- **SSL errors**: Verify certificate paths and permissions
- **Configuration errors**: Use `nginx -t` to test config

### General Issues
- **CORS errors**: Update Supabase CORS settings
- **Assets not loading**: Check file permissions and paths
- **Slow loading**: Verify compression and caching settings

---

## Performance Optimization

### Both Servers
1. **Enable compression** for text assets
2. **Set cache headers** for static assets  
3. **Use HTTPS** with HTTP/2 support
4. **Minimize redirects** and optimize images
5. **Enable security headers** for better security scores

### Server-Specific
- **Apache**: Use mod_pagespeed for additional optimizations
- **Nginx**: Enable brotli compression for better compression ratios

---

## Security Considerations

1. **HTTPS Only**: Force HTTPS redirects
2. **Security Headers**: Prevent XSS, clickjacking, MIME sniffing
3. **File Protection**: Block access to sensitive files
4. **Rate Limiting**: Prevent abuse (Nginx)
5. **Regular Updates**: Keep server software updated

Choose the configuration that matches your hosting environment and server setup.