- Docker containerization
- User authentication
- Additional CRUD operations
- Deployment to cloud platforms
=======
## Deployment to Heroku

1. Create a Heroku account and install the Heroku CLI.
2. Add a MySQL add-on (e.g., ClearDB or JawsDB) to your Heroku app.
3. Set environment variables in Heroku:
   - `DB_HOST`: Your database host
   - `DB_USER`: Your database user
   - `DB_PASSWORD`: Your database password
   - `DB_NAME`: Your database name
   - `DB_PORT`: Your database port (usually 3306)
4. Ensure `package.json` is in the root directory (it has been moved from backend/).
5. Push your code to Heroku:
   ```
   heroku create your-app-name
   git push heroku main
   ```
6. Open your app: `heroku open`

## Future Enhancements

- Docker containerization
- User authentication
- Additional CRUD operations
