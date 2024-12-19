.PHONY: build clean

# 기본 디렉토리 설정
PROTO_DIR=src/proto
GEN_DIR=src/gen

# buf 명령어
BUF=buf

build:
	@echo "[LOG] Fetching Protocol Buffers..."
	git submodule foreach git pull origin main
	@echo "[LOG] Building Protocol Buffers..."
	cd $(PROTO_DIR) && $(BUF) generate --template=buf.gen.ts.yaml
	@echo "[LOG] Protocol Buffers build completed!"

clean:
	@echo "[LOG] Cleaning generated files..."
	rm -rf $(GEN_DIR)/*
	@echo "[LOG] Clean completed!"

# 빌드 후 타입스크립트 파일 생성 확인
check:
	@echo "[LOG] Checking generated files..."
	@ls -la $(GEN_DIR)/v1

fetchProto:
	@echo "[LOG] Fetching Protocol Buffers..."
	git submodule foreach git pull origin main
