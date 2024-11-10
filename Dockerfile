# Sử dụng một image Node.js làm base
FROM node:22 AS development

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependency
RUN npm install

# Dùng typescript
RUN npm install typescript

# Copy toàn bộ mã nguồn của ứng dụng vào thư mục làm việc
COPY . .

# Build ứng dụng React
RUN npm run build

# Sử dụng một image Nginx làm base để phục vụ ứng dụng
FROM nginx:stable-alpine

# Cài thêm npm trong image nginx để lúc nữa chạy được lên npx react-inject-senv set
RUN apk add --update nodejs npm

# Truyền các file từ image node:22 vào
COPY --from=development /app/ /app/

# Xoá sạch thư mục trước khi truyền gói build vào
RUN rm -rf /usr/share/nginx/html/*

# Trong thư mục app chứa project và file build chạy lệnh npx react-inject-env set và copy folder builder vào nginx để chạy
# Vì sau khi build mà chạy npx react-inject-env set thì nó sẽ tạo env.js ở /build thay vì /app/build nên phải copy từ đấy vô nginx
ENTRYPOINT npx react-inject-env set \
&& cp -R /app/build/* /usr/share/nginx/html \
&& cp -R /build/* /usr/share/nginx/html \
&& 'nginx' '-g' 'daemon off;'

# Lưu ý chạy thêm lệnh 'nginx' '-g' 'daemon off;' để tránh nginx thoát ra sau khi chạy lệnh