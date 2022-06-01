# Webbrowser based login and deep linking

This is a simple example of a web browser based login and deep linking. 
This is made to prove the concept of deep linking with different versions of iOS and Android.

## Testing

Replace the IP with the IP of your expo instance.

### Deep linking

With the deep linking feature you can link to a specific screen in your app.
Here is an example of how to do this:

```shell
npx uri-scheme open exp://192.168.2.13:19000/--/settings -a -i
```

Change the path to switch between screens:
```shell
npx uri-scheme open exp://192.168.2.13:19000/--/home -a -i
```
