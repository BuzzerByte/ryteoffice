rBuzzer Office Standard Operation Procedure

Setup development environment
1. Git clone git@github.com:BuzzerByte/rbuzzeroffice.git
2. Docker-compose up -d —build
3. Composer install
4. Composer update
5. Npm install
6. Npm run dev/watch
7. Cp .env.example .env
8. In .env, edit:
DB_HOST = mysql
DB_Database = rbuzzeroffice
DB_username = root
DB_password = root
1. Docker-composer  exec php php artisan migrate —seed
2. Php artisan key:generate

Deployment to Production
1. Dep init -t Laravel
2. In deploy.php, edit:
	Project name = rbuzzeroffice
	Project repository = git@github.com:BuzzerByte/rbuzzeroffice.git
	host('xxx.xxx.xx.xx')
    		->user('deployer')
    		->identityFile('~/.ssh/deployerkey')
    		->set('deploy_path', '/var/www/html/rbuzzeroffice’);
	set('composer_options', 'install --verbose --prefer-dist --no-progress --no-interaction --optimize-autoloader’);
2.  Dep deploy

# docker-compose-laravel
A pretty simplified docker-compose workflow that sets up a LEMP network of containers for local Laravel development. You can view the full article that inspired this repo [here](https://medium.com/@aschmelyun).


## Usage

To get started, make sure you have [Docker installed](https://docs.docker.com/docker-for-mac/install/) on your system, and then clone this repository.

First add your entire Laravel project to the `src` folder, then open a terminal and from this cloned respository's root run `docker-compose up -d --build`. Open up your browser of choice to [http://localhost:8080](http://localhost:8080) and you should see your Laravel app running as intended. **Your Laravel app needs to be in the src directory first before bringing the containers up, otherwise the artisan container will not build, as it's missing the appropriate file.** 

**New:** Three new containers have been added that handle Composer, NPM, and Artisan commands without having to have these platforms installed on your local computer. Use the following command templates from your project root, modifiying them to fit your particular use case:

- `docker-compose run --rm composer update`
- `docker-compose run --rm npm run dev`
- `docker-compose run --rm artisan migrate` 

Containers created and their ports (if used) are as follows:

- **nginx** - `:8080`
- **mysql** - `:3306`
- **php** - `:9000`
- **npm**
- **composer**
- **artisan**

## Persistent MySQL Storage

By default, whenever you bring down the docker-compose network, your MySQL data will be removed after the containers are destroyed. If you would like to have persistent data that remains after bringing containers down and back up, do the following:

1. Create a `mysql` folder in the project root, alongside the `nginx` and `src` folders.
2. Under the mysql service in your `docker-compose.yml` file, add the following lines:

```
volumes:
  - ./mysql:/var/lib/mysql
```