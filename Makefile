.PHONY: build clean

# 기본 디렉토리 설정
PROTO_DIR=src/proto
GEN_DIR=src/gen

# buf 명령어
BUF=buf

build:
	@echo "Building Protocol Buffers..."
	cd $(PROTO_DIR) && $(BUF) generate --template=buf.gen.ts.yaml
	@echo "Protocol Buffers build completed!"

clean:
	@echo "Cleaning generated files..."
	rm -rf $(GEN_DIR)/*
	@echo "Clean completed!"

# 빌드 후 타입스크립트 파일 생성 확인
check:
	@echo "Checking generated files..."
	@ls -la $(GEN_DIR)/v1